import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from duckduckgo_search import DDGS
from bs4 import BeautifulSoup
import requests
from fake_useragent import UserAgent
from backend.app.logic.term_extractor import process_terms

load_dotenv()
llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', google_api_key=os.getenv("GOOGLE_API_KEY"))

def search_ddg(query: str, num_results : int = 3):
    with DDGS() as ddgs:
        return [r for r in ddgs.text(query, max_results=num_results)]
    
def scrape_webpage(url:str):
    try:
        headers = {"User-Agent": UserAgent().random}
        response = requests.get(url, headers=headers, timeout=10)
        soup = BeautifulSoup(response.text, "html.parser")

        for element in soup(["script", "style", "nav", "footer", "iframe"]):
            element.decompose()

        text = soup.get_text(separator='\n', strip=True)
        return text[:5000]
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return None

# TODO: Get user reading speed.

def summarize_content(content: str, query: str, minutes:int):
    prompt = ChatPromptTemplate.from_template(
        """
        Given the following outlines:

        Outlines:
        - Definition / Introduction
        - Examples and Analogies
        - Classification and Types
        - Causes and Origin
        - Origin, History and Background
        - Major Thinkers or Contributors
        - Motivation or Purpose
        - Supporting Arguments or Evidence
        - Criticism and Counterarguments
        - Controversies and Debates
        - Historical and Cultural Context
        - Usages and Applications
        - Scope and Boundaries
        - Signs and Characteristics
        - Core Components
        - Significance
        - Diagnosis and Detection
        - How it Works
        - Interdisciplinary Connections
        - Effects and Impact
        - Management and Interventions
        - Ongoing Research and Developments
        - Misconceptions
        , take any combination of these outlines that properly explain {query} and in exactly than {n_words} words, 
        combine and summarily explain the following content:

        Content:
        {content}
        
        """
    )
    chain = prompt | llm | StrOutputParser()
    explanation = chain.invoke({"query": query, "content" :content, "n_words": 175 * minutes})
    terms = process_terms(explanation)

    return explanation, terms

def retrieve_and_summarize(query: str):
    print(f"Searching for: {query}")
    search_results = search_ddg(query)

    summaries = []
    for i, result in enumerate(search_results[:3], 1):
        print(f"\nSource {i}: {result['title']} ({result['href']})")
        content = scrape_webpage(result['href'])

        if content:
            summary, terms = summarize_content(content, query, 3)
            print(f"Terms: {terms}")
            summaries.append(f"**Source {i} Summary** ({result['title']}) \n{summary}\n")
        else:
            summaries.append(f"**Source {i} Failed to retrieve content**\n")

    return "\n".join(summaries), terms

if __name__ == "__main__":
    query = "Renewable Energy"
    result, terms  = retrieve_and_summarize(query)
    print("\nFinal Summaries:\n", result)
    print(f"\n {terms}") if terms else print("None")
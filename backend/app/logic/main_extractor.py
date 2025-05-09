import os
from dotenv import load_dotenv
import logging
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from duckduckgo_search import DDGS
from bs4 import BeautifulSoup
import requests
from fake_useragent import UserAgent
from backend.app.logic.term_extractor import process_terms, verify_terms
from backend.app.logic.postprocessor import format_text
from backend.app.logic.article_processor import process_article
from backend.app.clarifyLogger import log_report as report

load_dotenv()
TEMP = "AN ERROR OCCURRED "
ERROR = logging.ERROR

try:
    llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', google_api_key=os.getenv("GOOGLE_API_KEY"))
except Exception as e:
    report(
        message=f"AN ERROR OCCURRED WHILE LOADING THE LLM: {e}",
        level=ERROR
    )


def search_ddg(query: str, num_results : int = 3):
    try:
        with DDGS() as ddgs:
            try:
                return [r for r in ddgs.text(query, max_results=num_results)]
            except Exception as e:
                report(
                    message=f"{TEMP}: {e}",
                    level=ERROR
                )
    except Exception as e:
        report(
            message=f"{TEMP}:{e}",
            level=ERROR
        )
    
# def scrape_webpage(url:str):
#     """
#     Retrieves the article text available on the given url using beautiful soup: deprecated
#     """
#     try:
#         headers = {"User-Agent": UserAgent().random}
#         response = requests.get(url, headers=headers, timeout=10)
#         soup = BeautifulSoup(response.text, "html.parser")

#         for element in soup(["script", "style", "nav", "footer", "iframe"]):
#             element.decompose()

#         text = soup.get_text(separator='\n', strip=True)
#         return text[:5000]
#     except Exception as e:
#         report(
#             message=f"Error scraping {url}: {e}",
#             level=ERROR)
#         return None

# TODO: Get user reading speed.

def summarize_content(content: str, query: str, minutes:int)-> tuple:
    """
    Summarizes a given piece of `content` text about `query` in `minutes` minutes.

    Args:
        content: The text to be summarized
        query: The subject of the text
        minutes: Used to calculate the number of words the summary should be, n_words = reading_speed * minutes. Here we assume reading speed is 175 WPM

    Returns:
        Summary: The summarized text
        Terms: A Dictionary containing potentially ambiguous terms from the summarized text.
    """
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
        
        Take any combination of these outlines that properly explain {query} and in exactly than {n_words} words, combine the sources and summarily explain the following content, the summary should not indicate that more than one source was used, it should be a general summarization of the sources with selected outlines as headings.

        Content:
        {content}
        
        """
    )

    # Defines a Langchain processing chain
    # Formats the user's input using the 'prompt' object
    # Passes it to the 'llm' for generation
    # The output of the llm is converted to a plain string using StrOutputParser.

    try:
        chain = prompt | llm | StrOutputParser()
        explanation = chain.invoke({"query": query, "content" :content, "n_words": 175 * minutes})
    except Exception as e:
        report(
            message=f"{TEMP}:{e}",
            level=ERROR
        )

    try:
        terms = process_terms(explanation)
    except Exception as e:
        report(
            message=f"{TEMP}:{e}",
            level=ERROR
        )

    return explanation, terms

def retrieve_and_summarize(query: str) -> tuple:
    """
    Retrieves relevant search results (using DuckDuckGo search engine), extracts text available on the webpages and summarizes them using the `summarize_content` function.

    Args:
        query: The subject to search for.

    Returns:
        explanation: The summarized text
        terms: Potentially ambiguous terms in the summarized text
        sources: Sources responsible for the information in the summarized text.
    """

    report(message=f"Searching for: {query}")

    try:
        search_results = search_ddg(query) # Searches and returns relevant results for any given query
    except Exception as e:
        report(message=f"{TEMP}while searching for {query}:{e}")

    sources = []
    summaries = ""
    result = []

    # Loops through the search results, add the details of the source to `sources`, process the articles and extract text from them, append the text to `summaries` and summarize the combined content.

    for i, result in enumerate(search_results[:3], 1):
        if result:
            print(f"\nSource {i}: {result['title']} ({result['href']})")
            #content = scrape_webpage(result['href'])
            sources.append((result['title'], result['href']))
            article = process_article(result['href'])
            summaries += f"{article}\n"
        else:
            report(message=f"Results for {query} not found.")

    if summaries:
            summary, terms = summarize_content(summaries, query, 3)
            print(f"\n{verify_terms(summary, terms)}\n")
            return format_text(summary), terms, sources
    else:
        report(message = f"**Source {i} Failed to retrieve content**\n")


if __name__ == "__main__":
    query = "Conclave"
    result, terms, sources  = retrieve_and_summarize(query)
    print("\nSummary:\n", result)
    print(f"\n {terms}") if terms else print("None")
import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from ast import literal_eval

load_dotenv()
llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', google_api_key=os.getenv("GOOGLE_API_KEY"))

def process_terms(text:str) -> dict:
    prompt = ChatPromptTemplate.from_template(
        """
        Read through this document thoroughly and respond with definitions of terms that a reader may find difficult to comprehend or terms that are not easily remembered.

        Example:
        Given the input: 
        'Machine Learning is a branch of Artificial Intelligence that allows systems to automatically learn and improve from experience. A model is trained using large amounts of data to make predictions or decisions without being explicitly programmed.' 
        
        Your example response would be:
        {{'Artificial Intelligence': 'Making computers perform tasks typically requiring human intelligence.', 'Model': 'A mathematical structure that makes predictions based on data.', 'Data':'Collections of facts, figures, or observations used for analysis.'}}

        Content:
        {text}
        """
    )
    chain = prompt | llm | StrOutputParser()
    definitions_raw = chain.invoke({"text": text})
    return post_(definitions_raw)

def post_(terms:str):
    term = terms.replace("json","")
    term = terms.replace("`", "")
    ind, ind_ = term.find('{'), term.find('}')
    term = term[ind:ind_+1]
    try:
        terms = literal_eval(term)
        return terms
    except (SyntaxError, ValueError) as e:
        return f"\nError evaluating input: {e}"
    
def verify_terms(summary, terms):
    summary = summary.lower()
    terms = list(terms.keys())
    length = len(terms)
    total = []
    for term in terms:
        if term.lower() in summary:
            total.append(term)
    return f"{(len(total)/length)*100}% {total}"

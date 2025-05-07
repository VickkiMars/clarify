import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from duckduckgo_search import DDGS
from bs4 import BeautifulSoup
import requests
from fake_useragent import UserAgent
from typing import Dict, List
import re

load_dotenv()
llm = ChatGoogleGenerativeAI(model='gemini-2.0-flash', google_api_key=os.getenv("GOOGLE_API_KEY"))

def process_terms(text:str) -> dict:
    prompt = ChatPromptTemplate.from_template(
        """
        Read through this document thoroughly and respond with the same text, providing definitions to words that may need defintions.


        Content:
        {text}

        Example:
        Given the input: 
        'Machine Learning is a branch of Artificial Intelligence that allows systems to automatically learn and improve from experience. A model is trained using large amounts of data to make predictions or decisions without being explicitly programmed.' 
        
        Your example response would be:
        {{'Artificial Intelligence': 'Making computers perform tasks typically requiring human intelligence.', 'Model': 'A mathematical structure that makes predictions based on data.', 'Data':'Collections of facts, figures, or observations used for analysis.'}}
        """
    )
    chain = prompt | llm | StrOutputParser()
    definitions_raw = chain.invoke({"text": text})
    print(f"Terms: {definitions_raw}")
    return definitions_raw


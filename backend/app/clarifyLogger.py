import logging
import os
from datetime import datetime
import inspect

def generate_log_file_name(
        base_name="clarify", 
        timestamp=False, 
        extension=".log"
        ):
    """
    Generates a log file name, optionally with a timestamp. Creates a new file for each day
    """
    name = base_name
    if timestamp:
        name = f"{name}_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    else:
        name = f"{base_name}_{datetime.now().strftime('%Y%m%d')}"
    return f"{name}{extension}"

FILENAME = generate_log_file_name()
def setup_logger(
        log_file_path="..\logs\clarify.log",
        level=logging.INFO,
        log_format='%(asctime)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s - %(message)s'
        ):
    """
    Sets up a logger that writes to the specified file, including filename and function name.

    Args:
        log_file_path: The relative path to the log file
        level: The logging level, logs below this level will not be written to the file.
        log_format: The format every log takes.

    Returns:

    """
    log_directory = '../logs'
    os.makedirs(log_directory, exist_ok=True)

    # Generate a log file name
    log_file = os.path.join(log_directory, generate_log_file_name())

    logger = logging.getLogger(__name__)
    logger.setLevel(level)

    # Create file handler and set formatter
    file_handler = logging.FileHandler(log_file)
    formatter = logging.Formatter(log_format)
    file_handler.setFormatter(formatter)

    # Add file handler to the logger
    logger.addHandler(file_handler)

    logger.info(f"Application started. Logs will be written to: {log_file}")

    return logger

def log_report(message, level=logging.INFO, logger=setup_logger()):
    """
    Logs a report message with the specified level, including filename and function name.
    
    Args:
        logger: 
        message: The report to be logged
        level: The logging level
        
    Returns:
    """

    frame = inspect.currentframe().f_back
    filename = os.path.basename(frame.f_code.co_filename)
    function_name = frame.f_code.co_name

    log_message = f"[{filename}:{function_name}()] {message}"

    if level == logging.DEBUG:
        logger.debug(log_message)
    elif level == logging.INFO:
        logger.info(log_message)
    elif level == logging.WARNING:
        logger.warning(log_message)
    elif level == logging.ERROR:
        logger.error(log_message)
    elif level == logging.CRITICAL:
        logger.critical(log_message)


if __name__ == "__main__":
    setup_logger()



Introduction
----------------
JANDIhistory is a tool to extract chat history from JANDI application's cache files.   
   
Requirement
---------------
OS: Windows 10, 11   
Language: Python 3.7 or above   
JANDI application which is installed on PC   

Run
---------
pip install -r requirements.txt   
python chathistory.py   
   
   
Output
------
TeamID: Id of the team where the content is included   
WriterID: writer/uploader of content   
Updatedtime: updated time of the json file   
Content: chat history or title of shared file   


Caution
-----
* chathistory.py unzip all the zip files in the same directory. Please run it in a directory where it does not include other zip files.   
* The JANDI application should be terminated before run chathistory.py


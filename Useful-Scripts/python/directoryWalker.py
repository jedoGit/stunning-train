# list in the current directory

# With listdir in os module you get the files and the folders in the current dir

# import os

# arr = os.listdir()
# Looking in a directory

# arr = os.listdir('c:\\files')
# with glob you can specify a type of file to list like this

# import glob

# txtfiles = []
# for file in glob.glob("*.txt"):
#     txtfiles.append(file)
# or

# mylist = [f for f in glob.glob("*.txt")]
# get the full path of only files in the current directory

# import os
# from os import listdir
# from os.path import isfile, join

# cwd = os.getcwd()
# onlyfiles = [os.path.join(cwd, f) for f in os.listdir(cwd) if 
# os.path.isfile(os.path.join(cwd, f))]
# print(onlyfiles) 

# ['G:\\getfilesname\\getfilesname.py', 'G:\\getfilesname\\example.txt']
# Getting the full path name with os.path.abspath

# You get the full path in return

#  import os
#  files_path = [os.path.abspath(x) for x in os.listdir()]
#  print(files_path)
 
#  ['F:\\documenti\applications.txt', 'F:\\documenti\collections.txt']
# Walk: going through sub directories

# os.walk returns the root, the directories list and the files list, that is why I unpacked them in r, d, f in the for loop; it, then, looks for other files and directories in the subfolders of the root and so on until there are no subfolders.

# import os

# # Getting the current work directory (cwd)
# thisdir = os.getcwd()

# # r=root, d=directories, f = files
# for r, d, f in os.walk(thisdir):
#     for file in f:
#         if file.endswith(".docx"):
#             print(os.path.join(r, file))
# To go up in the directory tree

# # Method 1
# x = os.listdir('..')

# # Method 2
# x= os.listdir('/')
# Get files of a particular subdirectory with os.listdir()

# import os

# x = os.listdir("./content")
# os.walk('.') - current directory

#  import os
#  arr = next(os.walk('.'))[2]
#  print(arr)
 
#  >>> ['5bs_Turismo1.pdf', '5bs_Turismo1.pptx', 'esperienza.txt']
# next(os.walk('.')) and os.path.join('dir', 'file')

#  import os
#  arr = []
#  for d,r,f in next(os.walk("F:\\_python")):
#      for file in f:
#          arr.append(os.path.join(r,file))

#  for f in arr:
#      print(files)

# >>> F:\\_python\\dict_class.py
# >>> F:\\_python\\programmi.txt
# next... walk

#  [os.path.join(r,file) for r,d,f in next(os.walk("F:\\_python")) for file in f]
 
#  >>> ['F:\\_python\\dict_class.py', 'F:\\_python\\programmi.txt']
# os.walk

# x = [os.path.join(r,file) for r,d,f in os.walk("F:\\_python") for file in f]
# print(x)

# >>> ['F:\\_python\\dict.py', 'F:\\_python\\progr.txt', 'F:\\_python\\readl.py']
# os.listdir() - get only txt files

#  arr_txt = [x for x in os.listdir() if x.endswith(".txt")]
 
# Using glob to get the full path of the files

# from path import path
# from glob import glob

# x = [path(f).abspath() for f in glob("F:\\*.txt")]
# Using os.path.isfile to avoid directories in the list

# import os.path
# listOfFiles = [f for f in os.listdir() if os.path.isfile(f)]
# Using pathlib from Python 3.4

# import pathlib

# flist = []
# for p in pathlib.Path('.').iterdir():
#     if p.is_file():
#         print(p)
#         flist.append(p)
# With list comprehension:

# flist = [p for p in pathlib.Path('.').iterdir() if p.is_file()]
# Use glob method in pathlib.Path()

# import pathlib

# py = pathlib.Path().glob("*.py")
# Get all and only files with os.walk: checks only in the third element returned, i.e. the list of the files

# import os
# x = [i[2] for i in os.walk('.')]
# y=[]
# for t in x:
#     for f in t:
#         y.append(f)
# Get only files with next in a directory: returns only the file in the root folder

#  import os
#  x = next(os.walk('F://python'))[2]
# Get only directories with next and walk in a directory, because in the [1] element there are the folders only

#  import os
#  next(os.walk('F://python'))[1] # for the current dir use ('.')
 
#  >>> ['python3','others']
# Get all the subdir names with walk

# for r,d,f in os.walk("F:\\_python"):
#     for dirs in d:
#         print(dirs)
# os.scandir() from Python 3.5 and greater

# import os
# x = [f.name for f in os.scandir() if f.is_file()]

# # Another example with `scandir` (a little variation from docs.python.org)
# # This one is more efficient than `os.listdir`.
# # In this case, it shows the files only in the current directory
# # where the script is executed.

# import os
# with os.scandir() as i:
#     for entry in i:
#         if entry.is_file():
#             print(entry.name)


import datetime
import os
import stat

class directoryWalker:
    def timeConvert(self, aTime):
        dt = aTime
        newTime = datetime.datetime.fromtimestamp(dt)
        return newTime.date()
    
    def sizeFormat(self,size):
        newForm = format(size, ".0f")
        return newForm

    def listAllFilesAndDirs(self, path):
        res = {}

        # r=root, d=directories, f = files
        for r, d, f in os.walk(path):
            # print("Root: ", r)
            if ( len(d) ): 
                # print("\tDirectories: ",  d)
                filesAndDirs = { "dirs": d}
            if ( len(f) ): 
                # print("\tFiles: ", f)
                filesAndDirs.update({"files": f})
            
            # for file in f:
            #     if file.endswith(".js"):
            #         print(os.path.join(r, file))

            res[r] = filesAndDirs

        return res
    
    def listFullPathOfFiles(self, path, fileType):
        res = []
        for r, d, f in os.walk(path):
            for file in f:
                if file.endswith(fileType):
                    # print(os.path.join(r,file))
                    res.append(os.path.join(r,file))
        return res
        
    
    def printDir(self, path):
        for fname in os.listdir(path):
            filePath = os.path.join(path, fname)
            fileStat = os.stat(filePath)
            if os.path.isfile(filePath):
                print("{0:} {1:>5} {2:} {3:<}".format( stat.filemode(fileStat.st_mode), self.sizeFormat(fileStat.st_size), self.timeConvert(fileStat.st_mtime), fname))
            else:
                print("{0:} {1:>5} {2:} {3:<}/".format( stat.filemode(fileStat.st_mode), "0", self.timeConvert(fileStat.st_mtime), fname))
    
if __name__ == "__main__":

    # Assign the class to obj so we can call it here in the main function
    obj = directoryWalker()

    # Lets get a list of all files and dirs on a specified directory
    # This will return an object {'<rootPath>': {'dirs':[<dirs>], 'files':[<files>]}}
    filesAndDirs = obj.listAllFilesAndDirs(os.getcwd())
    
    # Alright, let's print this object out
    for r, fd in filesAndDirs.items():
        print("root: ", r)
        for k, v in fd.items():
            if k == 'dirs':
                print("\tdirs: ", v)
            if k == 'files':
                print("\tfiles: ", v)

    print("-" * 50)

    # Let's get a list of all files on a specified directory and specify a filetype
    # This will return a list
    filesList = obj.listFullPathOfFiles(os.getcwd(),".js")

    # Let's print this list
    for f in filesList:
        print(f)
   
    print("-" * 50)

    print(os.getcwd() + ":")
    # obj.printDir(os.getcwd()+"\LeetCode\HashMap\JavaScript")
    obj.printDir(os.getcwd())



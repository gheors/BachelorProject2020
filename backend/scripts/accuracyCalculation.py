import os
dataset_path = "/Users/sergiogheorghita/Desktop/Bachelor Project 2.0/bachelor_project server/python/media/openimages_dataset/test1"

with open("test.txt", "w") as a:
    for path, subdirs, files in os.walk(dataset_path):
       for filename in files:
         f = os.path.join(path, filename)
         a.write(str(f) + os.linesep)


os.chdir('../darknet-master')

os.system("./darknet detector valid cfg/coco.data cfg/yolov4.cfg yolov4.weights")
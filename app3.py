from flask import Flask, request, jsonify
import cv2 as cv
import numpy as np

app = Flask(__name__)

@app.route( '/predict', methods=['POST'])
def predict():
    classifier = cv.CascadeClassifier(cv.data.haarcascades+'haarcascade_frontalface_default.xml')
    print(classifier)
    cam = cv.VideoCapture(0)

    while True:
        
        _, img = cam.read()
        img = cv.flip(img,1)
        
        faces = classifier.detectMultiScale(img, 1.1, 5)
        for f in faces:
            if f[-1] == max(faces[:,-1]):
                break
        if (len(faces)>=1):
            x = f[0]
            y = f[1]
            w = f[2]
            h = f[3]
        for (x,y,w,z) in faces:
            cv.rectangle(img, (x,y),(x+w,y+h) , (0,180,0), 3)
            # cv.rectangle(img, (x,y),(x+w,y+h) , (0,180,0), 3)

            face = img[y:y+h, x:x+w]
            face2 = cv.resize(face, (144,144))    
            cv.imshow('Face'   , face2)

        cv.imshow('Frame'  , img )
        if cv.waitKey(1) == 27:
            cv.destroyAllWindows()
            cam.release()
            break

if __name__ == '__main__':
    app.run(debug=True)
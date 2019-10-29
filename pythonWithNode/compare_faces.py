import face_recognition
import sys
import os

print(sys.argv[0])

images = os.listdir('public/uploads')

search_image = face_recognition.load_image_file(sys.argv[1])
face_encoding = face_recognition.face_encodings(search_image)[0]

for image in images:
  image_file = face_recognition.load_image_file('public/uploads/'+image)
  known_faces = [(face_recognition.face_encodings(image_file)[0])]
  match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.50)
  if(match[0]):
    print('Found')
    print(image)
    sys.exit(0)  

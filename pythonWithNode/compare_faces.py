import face_recognition
import sys
import os

print(sys.argv[0])

images = os.listdir('public/uploads')

class MoreThanOneFace(Exception):
  """Raised when more than one faces are detected in the image"""
  pass

class NoFace(Exception):
  """Raised when no face is detected in the image"""
  pass

try:
  # Input Image
  search_image = face_recognition.load_image_file(sys.argv[1])
  face_locations = face_recognition.face_locations(search_image)
  if(len(face_locations) > 1):
    raise MoreThanOneFace
  if(len(face_locations) == 0):
    raise NoFace

  # Recognise each image from the folder
  face_encoding = face_recognition.face_encodings(search_image)[0]
  for image in images:
    image_file = face_recognition.load_image_file('public/uploads/'+image)
    face_locations = face_recognition.face_locations(image_file)
    if(len(face_locations) != 1):
      continue
    known_faces = [(face_recognition.face_encodings(image_file)[0])]
    match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.50)
    if(match[0]):
      print(1)
      print(image)
      sys.exit(0)
  
  print(0)
  print("Unable to find family of Missing Person.")
except MoreThanOneFace:
  print(0)
  print("More than one Face Detected in image.")
except NoFace:
  print(0)
  print("No Face Detected in image")
import face_recognition
import cv2
import sys

# Open the input movie file
input_video = cv2.VideoCapture(sys.argv[1])
length = int(input_video.get(cv2.CAP_PROP_FRAME_COUNT))

# Load some sample pictures and learn how to recognize them.
female_image = face_recognition.load_image_file(sys.argv[2])
female_face_encoding = face_recognition.face_encodings(female_image)[0]

known_faces = [
    female_face_encoding
]

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
frame_number = 0

while True:
    # Grab a single frame of video
    ret, frame = input_video.read()
    frame_number += 1

    # Quit when the input video file ends
    if not ret:
        break

    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_frame = frame[:, :, ::-1]

    # Find all the faces and face encodings in the current frame of video
    face_locations = face_recognition.face_locations(rgb_frame)
    face_encodings = face_recognition.face_encodings(rgb_frame, face_locations)

    face_names = []
    for face_encoding in face_encodings:
        # See if the face is a match for the known face(s)
        match = face_recognition.compare_faces(known_faces, face_encoding, tolerance=0.50)
        if match[0]:
            print("Found Person")

# All done!
input_video.release()
cv2.destroyAllWindows()

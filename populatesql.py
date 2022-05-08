from cltk import NLP
import mysql.connector

# CREATE DATABASE words
# CREATE USER 'test'@'localhost';
# GRANT ALL PRIVILEGES ON words.* To 'test'@'localhost' IDENTIFIED BY 'password';
# USE words;
# CREATE TABLE main (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, word VARCHAR(30) NOT NULL, lemma VARCHAR(30) NOT NULL, pos VARCHAR(30) NOT NULL, features VARCHAR(1000) NOT NULL);

#there will be duplicates which is not ideal

source = "Architecti est scientia pluribus disciplinis et variis eruditionibus ornata, quae ab ceteris artibus perficiuntur. Opera ea nascitur et fabrica et ratiocinatione."

cltk_nlp = NLP(language='lat')
cltk_doc = cltk_nlp.analyze(text=source)

mydb = mysql.connector.connect(
  host="localhost",
  user="test",
  password="password",
  database="words"
)

mycursor = mydb.cursor()

sql = "INSERT INTO main (word, lemma, pos, features) VALUES (%s, %s, %s, %s)"

to_push = []

for i in range(0,len(cltk_doc.tokens)):
	# print("---------------------------")
	# print(cltk_doc.words[i].string) #the word itself as found
	# print(cltk_doc.lemmata[i]) #lemma
	# print(cltk_doc.words[i].pos) #type
	# print(cltk_doc.words[i].features) #features
	
	to_push.append((str(cltk_doc.words[i].string), str(cltk_doc.lemmata[i]), str(cltk_doc.words[i].pos), str(cltk_doc.words[i].features)))

mycursor.executemany(sql, to_push)
mydb.commit()

print(mycursor.rowcount, "records inserted into db.")
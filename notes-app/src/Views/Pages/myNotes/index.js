import React, { useContext, useState, useEffect } from 'react'
import PageLayout from '../../utils/PageLayout/PageLayout';
import notes from '../../../Models/getNotes/getNotes';
import UserContext from '../../../context/context';
import { Card, Button } from 'react-bootstrap';
import deleteNote from '../../../Models/deleteNote/deleteNote';
import { useHistory } from 'react-router-dom';

const MyNotes = () => {

    const context = useContext(UserContext);
    const history = useHistory()
    const [userId, setUserId] = useState(null);
    const [notesList, setNotesList] = useState(null);

    
  function refreshPage() {
    window.location.reload(false);
  }

    const killNote = (theme) => {
      deleteNote(theme).then(()=>{
          setTimeout(()=>{
              refreshPage()
          },200)
      })
    }

    useEffect(() => {

        if (context.user !== null) { ; setUserId(context.user.uid) }

        if (userId !== null) {
            notes.then(note => {
                const currentUserNotes = note.data().allNotes.reduce((acc, cVal) => {
                    if (cVal.userData.userId === userId) {
                        acc.push(cVal);
                    }
                    return acc
                }, []);

                setNotesList(currentUserNotes)
            })
        }

    }, [context, userId]);


    if (notesList === null) {
        return (
            <div>
                <PageLayout>
                    <h1>My Notes</h1>
                    <h3>Loading</h3>
                </PageLayout>
            </div>
        )
    }

    return (
        <div>
            <PageLayout>
                <h1>My Notes</h1>
                {notesList.map((note, index) => {
                    return (
                        <Card key={index}>
                            <Card.Body>
                                <Card.Title>{note.theme}</Card.Title>
                                <Card.Text>
                                    {note.note}
                                </Card.Text>
                                <Button onClick={() => killNote(note.theme)} size="sm" variant="danger">Delete note</Button>
                            </Card.Body>
                        </Card>
                    )
                })}
                <br />
                <Button onClick={refreshPage}>Refresh</Button>
            </PageLayout>
        </div>
    )
}

export default MyNotes;
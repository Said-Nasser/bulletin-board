# How react apps work?
 1. we store state data in the parent component, 
 2. we pass down states via props, 
 3. and then we pass up new information with events.

# we have two components, Board (the parent) and Note (the child)
# board
 1. we store the notes in the 'state', each state should have an id and a note
 2. we pass down the notes from the 'state' as props to be rendered on the screen
 
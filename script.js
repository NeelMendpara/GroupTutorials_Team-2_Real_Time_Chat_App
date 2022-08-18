// Client side script 

// the socket is hosted in port 3000 
const socket = io('http://localhost:3000', { transports : ['websocket'] });

const messageForm = document.getElementById('send-container');
const messageTextField = document.getElementById('message-input');
const messageContainer = document.getElementById('message-container');

const userName = prompt('Who is gonna chat (First Name)?');
appendMessage('You joined')

// send the name to other users 
socket.emit('new-user', userName);


socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`);
});

// user connect message 
socket.on('user-connect', userName => {
  // show name
  appendMessage(`Welcome ${userName}. Say hi!`);
});

// disconnect message 
socket.on('user-disconnect', userName => {
  // show name
  appendMessage(`${userName} disconnected`);
})


// when the user submit the form this function will be triggered 
messageForm.addEventListener('submit', e => {
  // prevents from POST  
  e.preventDefault();
  // get the actual message from the input field 
  const message = messageTextField.value;

  appendMessage(`You: ${message}`);

  // send the message fetched to the server 
  socket.emit('send-chat-message', message);

  // after the message is sent clear the input field for the user 
  messageTextField.value = '';
});

// builds html element to display the message 
function appendMessage(message)  {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
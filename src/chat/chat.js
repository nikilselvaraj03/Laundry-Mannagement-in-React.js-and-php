import React from 'react'
import './chat.css'
function Chat() {
    return (
        <div className="chatbot">
            <div id="chats" className="info-content">
                <div className="font-oswald d-flex flex-direction-row w-100 justify-center sideNavHeader">Chat</div>
                <div className="d-flex flex-direction-column chat-container" style={{ height: "450px" }}>
                    <div id="display_message" className="display_message"></div>
                    <form className="d-flex flex-direction-column w-100 chat-area">
                        <div className="d-flex flex-direction-row chatBox">
                            <textarea id="message" className="font-roboto" name="message" placeholder="Enter your Message"></textarea>
                            <button className="btn submit" type="submit" onClick={showMessage}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    function showMessage(event) {
        // Displaying chat messages
        event.preventDefault()
        document.getElementById('display_message').innerHTML += `<p>${document.getElementById("message").value}</p></br>`;
        document.getElementById("message").value = '';
    }
}
export default Chat
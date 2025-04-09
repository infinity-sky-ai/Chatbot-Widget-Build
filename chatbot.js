// Chat Widget Script
document.addEventListener('DOMContentLoaded', function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #59b3ea);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #59b3ea);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 1000;
            display: none;
            width: 370px;
            height: 600px;
            max-height: 75vh;
            background: var(--chat--color-background);
            border-radius: 18px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
            border: none;
            overflow: hidden;
            font-family: inherit;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px);
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 25px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
            opacity: 1;
            transform: translateY(0);
        }

        .n8n-chat-widget .brand-header {
            padding: 18px 20px;
            display: flex;
            align-items: center;
            gap: 14px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            position: relative;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
            font-size: 18px;
            opacity: 0.8;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.05);
        }

        .n8n-chat-widget .brand-header img {
            width: 38px;
            height: 38px;
            border-radius: 10px;
            object-fit: cover;
            border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .n8n-chat-widget .brand-header span {
            font-size: 17px;
            font-weight: 600;
            color: white;
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 30px;
            text-align: center;
            width: 100%;
            max-width: 320px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 700;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.3s ease;
            font-weight: 600;
            font-family: inherit;
            margin-bottom: 16px;
            box-shadow: 0 4px 15px rgba(89, 179, 234, 0.25);
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(89, 179, 234, 0.35);
        }

        .n8n-chat-widget .new-chat-btn:active {
            transform: translateY(0);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
        }

        .n8n-chat-widget .response-text {
            font-size: 15px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
            opacity: 1;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 12px;
            scroll-behavior: smooth;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 6px;
        }

        .n8n-chat-widget .chat-messages::-webkit-scrollbar-track {
            background-color: transparent;
        }

        .n8n-chat-widget .chat-message {
            padding: 14px 18px;
            margin: 0;
            border-radius: 16px;
            max-width: 85%;
            word-wrap: break-word;
            font-size: 15px;
            line-height: 1.5;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
            animation: messageAppear 0.3s forwards;
        }

        @keyframes messageAppear {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            border-radius: 16px 16px 4px 16px;
        }

        .n8n-chat-widget .chat-message.bot {
            background: white;
            color: var(--chat--color-font);
            align-self: flex-start;
            border-radius: 16px 16px 16px 4px;
        }

        .n8n-chat-widget .chat-message.error {
            background: #fff0f0 !important;
            border: 1px solid rgba(211, 47, 47, 0.2) !important;
            color: #d32f2f !important;
        }

        .n8n-chat-widget .chat-input {
            padding: 16px 20px;
            background: white;
            border-top: 1px solid #edf2f7;
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 14px 18px;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            background: #f8fafc;
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 15px;
            line-height: 1.5;
            min-height: 24px;
            max-height: 120px;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
        }

        .n8n-chat-widget .chat-input textarea:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            background: white;
            box-shadow: 0 0 0 3px rgba(89, 179, 234, 0.15);
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: #a0aec0;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            width: 48px;
            height: 48px;
            padding: 0;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 2px 8px rgba(89, 179, 234, 0.25);
        }

        .n8n-chat-widget .chat-input button svg {
            width: 20px;
            height: 20px;
            fill: white;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(89, 179, 234, 0.3);
        }

        .n8n-chat-widget .chat-input button:active {
            transform: translateY(0);
        }

        .n8n-chat-widget .chat-input button:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        .n8n-chat-widget .chat-footer {
            padding: 10px 20px;
            background: white;
            border-top: 1px solid #edf2f7;
            text-align: center;
            font-size: 12px;
        }

        .n8n-chat-widget .chat-footer a {
            color: #a0aec0;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .n8n-chat-widget .chat-footer a:hover {
            color: var(--chat--color-primary);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 25px;
            right: 25px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(89, 179, 234, 0.3);
            z-index: 999;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 25px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 8px 25px rgba(89, 179, 234, 0.4);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 26px;
            height: 26px;
            fill: white;
            transition: transform 0.3s ease;
        }

        .n8n-chat-widget .chat-container.open + .chat-toggle svg {
            transform: rotate(45deg);
        }

        /* Typing indicator */
        .n8n-chat-widget .typing-indicator {
            display: none;
            padding: 10px 16px;
            background: white;
            border-radius: 16px;
            align-self: flex-start;
            margin-top: 8px;
            width: fit-content;
        }

        .n8n-chat-widget .typing-indicator.active {
            display: flex;
        }

        .n8n-chat-widget .typing-indicator span {
            width: 8px;
            height: 8px;
            background: #cbd5e0;
            border-radius: 50%;
            display: inline-block;
            margin: 0 2px;
            animation: typing 1.5s infinite ease-in-out;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }

        .n8n-chat-widget .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typing {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Apply custom styles from config
    const config = window.ChatWidgetConfig || {};
    config.branding = config.branding || {};
    config.style = config.style || {};
    config.webhook = config.webhook || {};
    config.branding.poweredBy = config.branding.poweredBy || { text: 'Powered by InfinitySkyAi', link: 'https://infinitysky.ai' };
    
    // Apply custom styles
    const root = document.documentElement;
    root.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor || '#59b3ea');
    root.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor || config.style.primaryColor || '#59b3ea');
    root.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor || '#ffffff');
    root.style.setProperty('--n8n-chat-font-color', config.style.fontColor || '#333333');
    
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    // Current session ID for the conversation
    let currentSessionId;
    
    // Create HTML for new conversation screen
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <div class="welcome-text">${config.branding.welcomeText}</div>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Start a conversation
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;
    
    // Create HTML for chat interface
    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message here..." rows="1"></textarea>
                <button type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                </button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 20c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9zm1-9h4v2h-4v4h-2v-4H7v-2h4V8h2v4z"/>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    messagesContainer.appendChild(typingIndicator);

    function generateUUID() {
        return crypto.randomUUID();
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();
        const data = [{
            action: "loadPreviousSession",
            sessionId: currentSessionId,
            route: config.webhook.route,
            metadata: {
                userId: ""
            }
        }];

        try {
            // Show typing indicator
            typingIndicator.classList.add('active');
            
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Hide typing indicator
            typingIndicator.classList.remove('active');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseText = await response.text();
            
            if (!responseText || responseText.trim() === '') {
                throw new Error('Empty response from server');
            }
            
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (error) {
                console.error('Failed to parse response:', error);
                throw new Error('Invalid response format');
            }

            chatContainer.querySelector('.brand-header').style.display = 'none';
            chatContainer.querySelector('.new-conversation').style.display = 'none';
            chatInterface.classList.add('active');

            // Extract message content based on response format
            let messageContent = '';
            
            if (responseData.chatHistory && Array.isArray(responseData.chatHistory)) {
                // Find the last AI message
                const lastAIMessage = responseData.chatHistory
                    .slice() // Create a copy to avoid modifying the original
                    .reverse()
                    .find(msg => 
                        msg.type === "constructor" && 
                        msg.id && 
                        msg.id[2] === "AIMessage" &&
                        msg.kwargs &&
                        msg.kwargs.content
                    );

                if (lastAIMessage) {
                    messageContent = lastAIMessage.kwargs.content;
                }
            } else if (Array.isArray(responseData)) {
                messageContent = responseData[0]?.output || '';
            } else {
                messageContent = responseData.output || '';
            }

            if (!messageContent) {
                messageContent = "Hello! How can I help you today?";
            }

            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = messageContent;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
        } catch (error) {
            console.error('Error:', error);
            typingIndicator.classList.remove('active');
            
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message bot error';
            errorMessageDiv.textContent = 'Sorry, I encountered an error. Please try again.';
            messagesContainer.appendChild(errorMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: ""
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            // Disable send button and show typing indicator
            sendButton.disabled = true;
            typingIndicator.classList.add('active');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });

            // Hide typing indicator
            typingIndicator.classList.remove('active');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const responseText = await response.text();
            
            if (!responseText || responseText.trim() === '') {
                throw new Error('Empty response from server');
            }
            
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (error) {
                console.error('Failed to parse JSON response:', responseText);
                throw new Error('Invalid response format');
            }

            // Extract message content based on response format
            let botMessage = '';
            
            if (data.chatHistory && Array.isArray(data.chatHistory)) {
                // Find the last AI message
                const lastAIMessage = data.chatHistory
                    .slice() // Create a copy to avoid modifying the original
                    .reverse()
                    .find(msg => 
                        msg.type === "constructor" && 
                        msg.id && 
                        msg.id[2] === "AIMessage" &&
                        msg.kwargs &&
                        msg.kwargs.content
                    );

                if (lastAIMessage) {
                    botMessage = lastAIMessage.kwargs.content;
                }
            } else if (Array.isArray(data)) {
                botMessage = data[0]?.output || '';
            } else {
                botMessage = data.output || '';
            }

            if (!botMessage) {
                throw new Error('No valid message found in response');
            }
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = botMessage;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

        } catch (error) {
            console.error('Error in sendMessage:', error);
            
            // Show error message to user
            const errorMessageDiv = document.createElement('div');
            errorMessageDiv.className = 'chat-message bot error';
            errorMessageDiv.textContent = 'Sorry, I encountered an error. Please try again later.';
            messagesContainer.appendChild(errorMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } finally {
            // Re-enable send button
            sendButton.disabled = false;
        }
    }

    // Auto-resize textarea as user types
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        const maxHeight = 120;
        this.style.height = Math.min(this.scrollHeight, maxHeight) + 'px';
    });

    newChatBtn.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
            textarea.style.height = 'auto';
        }
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
                textarea.style.height = 'auto';
            }
        }
    });
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
});
# Chatbot Widget

A modern, customizable chat widget that can be embedded into any website to provide chat functionality. This widget integrates with n8n webhooks and provides a sleek user interface for website visitors to communicate with your team or AI assistant.

## Features

- Modern, clean design with smooth animations
- Customizable colors, positioning, and branding
- Typing indicators to show when responses are being generated
- Responsive layout that works on all devices
- Auto-resizing text input
- Error handling and connectivity detection
- Support for multiple message formats

## Installation

Add the following code to your website's HTML:

```html
<!-- Widget Configuration -->
<script>
    window.ChatWidgetConfig = {
        webhook: {
            url: 'YOUR_WEBHOOK_URL',
            route: 'general'
        },
        branding: {
            logo: 'YOUR_LOGO_URL',
            name: 'Your Company Name',
            welcomeText: 'Hi 👋, how can we help?',
            responseTimeText: 'We typically respond right away',
            poweredBy: {
                text: 'Powered by InfinitySkyAi',
                link: 'https://infinitysky.ai'
            }
        },
        style: {
            primaryColor: '#59b3ea',
            secondaryColor: '#59b3ea',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/infinity-sky-ai/Chatbot-Widget-Build@main/chatbot.js"></script>
```

## Configuration Options

### Webhook
- `url`: Your webhook URL for handling chat messages
- `route`: The route parameter to send with each request

### Branding
- `logo`: URL to your company logo
- `name`: Your company or chatbot name
- `welcomeText`: Welcome message shown to users
- `responseTimeText`: Text indicating response time expectations
- `poweredBy`: Footer text and link

### Style
- `primaryColor`: Main color for buttons and user messages
- `secondaryColor`: Secondary color for gradients
- `position`: Widget position ('left' or 'right')
- `backgroundColor`: Background color of the chat widget
- `fontColor`: Text color for messages and interface

## License

MIT 
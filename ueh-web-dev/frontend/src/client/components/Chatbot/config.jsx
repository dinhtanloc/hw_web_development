import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from './Avatar';
import StartBtn from './StartBtn';
import StartSlow from './StartSlow';
import DipslayImage from './DipslayImage'

const botAvatar = (props) => {
return(
    <div>

        <Avatar {...props} />
    </div>
    );
}

const config = {
    botName: "AgeDrive Explorer",
    initialMessages: [
        createChatBotMessage(`Welcome to RideAge Advisor!`, {
            widget: "startBtn"
        })
    ],
    customComponents: {
        botAvatar: botAvatar,
    },
    state: {
        checker: null,
        // data,
        userData: {
            name: "",
            age: 0,
            category: "",
            product: {
                name: "",
                link: "",
                imageUrl: ""
            }
        }
    },
    widgets: [
        {
            widgetName: "startBtn",
            widgetFunc: (props) => <StartBtn {...props} />,
        },
        // {
        //     widgetName: "startSlow",
        //     widgetFunc: (props) => <StartSlow {...props} />,
        // },
        {
            widgetName: "finalImage",
            widgetFunc: (props) => <DipslayImage {...props} />,
        },
    ]
};

export default config;

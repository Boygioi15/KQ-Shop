import { useEffect } from 'react';

const ChatBotWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const firstScript = document.getElementsByTagName('script')[0];

    script.type = 'text/javascript';
    script.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '6783ca983c6303d0a3ba1d18' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    
    firstScript.parentNode.insertBefore(script, firstScript);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default ChatBotWidget;
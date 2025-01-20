The solution involves carefully managing the event listener lifecycle.  Ensure that `Linking.removeEventListener` is called when the component unmounts, even if the app is closed unexpectedly. Add error handling to prevent crashes and ensure that the listener is removed even if it's not found. Here's an example:

```javascript
import * as Linking from 'expo-linking';
import React, { useEffect, useState } from 'react';

function App() {
  const [url, setUrl] = useState(null);
  useEffect(() => {
    const handleUrl = (event) => {
      setUrl(event.url);
    };

    const init = async () => {
      Linking.addEventListener('url', handleUrl);
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setUrl(initialUrl);
      }
    };

    init();
    return () => {
      try {
        Linking.removeEventListener('url', handleUrl);
      } catch (error) {
        // Log any errors. Do not let the app crash
        console.error('Error removing event listener:', error);
      }
    };
  }, []);

  return (
    <View>
      {url ? <Text>Opened with URL: {url}</Text> : <Text>No URL opened</Text>}
    </View>
  );
}
```
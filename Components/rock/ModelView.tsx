import { useEffect, useState, useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import { LayoutAnimation, StyleSheet } from "react-native";
import { useAtom } from "jotai";

import { getFromSecureStorage } from "../../services/store";
import { viewerUrl } from "../../services/apiConfig";
import { rockActiveRoute } from "../../store/rock";

type ModelViewProps = {
  id: string;
};

const ModelView = (props: ModelViewProps) => {
  const webViewRef = useRef<WebView>(null);
  const [token, setToken] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useAtom(rockActiveRoute);

  useEffect(() => {
    webViewRef.current?.postMessage(activeRoute || "null");
  }, [activeRoute]);

  useEffect(() => {
    const getToken = async () => {
      const jwt = await getFromSecureStorage("jwt");
      setToken(jwt);
    };
    getToken();
  }, []);

  const receiveMessage = (e: WebViewMessageEvent) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setActiveRoute(e.nativeEvent.data === "null" ? null : e.nativeEvent.data);
  };

  const debugging = `
     console = new Object();
     console.log = function(log) {
       window.webViewBridge.send("console", log);
     };
     console.debug = console.log;
     console.info = console.log;
     console.warn = console.log;
     console.error = console.log;
     `;

  return (
    token && (
      <WebView
        ref={webViewRef}
        style={styles.container}
        source={{
          uri: `${viewerUrl}/${props.id}`,
        }}
        injectedJavaScriptBeforeContentLoaded={`
        XMLHttpRequest.prototype.open = (function(open) {
          return function(method,url,async) {
            open.apply(this,arguments);
            this.setRequestHeader('Authorization', 'Bearer ${token}');
          };
        })(XMLHttpRequest.prototype.open);
      `}
        injectedJavaScriptBeforeContentLoadedForMainFrameOnly={false}
        injectedJavaScriptForMainFrameOnly={false}
        injectedJavaScript={debugging}
        onMessage={receiveMessage}
      />
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export default ModelView;

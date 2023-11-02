import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

import { getFromSecureStorage } from "../../services/store";

type ModelViewProps = {
  id: string;
};

const ModelView = (props: ModelViewProps) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      const jwt = await getFromSecureStorage("jwt");
      console.log(jwt);
      setToken(jwt);
    };
    getToken();
  }, []);
  return (
    token && (
      <WebView
        style={styles.container}
        source={{
          uri: `http://localhost:3000/${props.id}}`,
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

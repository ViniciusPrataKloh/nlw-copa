import { NativeBaseProvider, StatusBar, Text } from 'native-base'
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from "@expo-google-fonts/roboto"

import { THEME } from './src/styles/theme'
import { Loading } from './src/components/Loading';
import { SingIn } from './src/screens/SignIn';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      ></StatusBar>

      {fontsLoaded ? <SingIn /> : <Loading />}
    </NativeBaseProvider >
  );
}

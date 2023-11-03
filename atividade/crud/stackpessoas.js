import { createStackNavigator } from '@react-navigation/stack'
import FPessoa from './FPessoa'
import LPessoas from './LPessoas'

const Stack = createStackNavigator()

export default function StackPessoas() {
    return (

        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='LPessoas'
        >

            <Stack.Screen name='LPessoas' component={LPessoas} />

            <Stack.Screen name='FPessoa' component={FPessoa} />

        </Stack.Navigator>

    )
}
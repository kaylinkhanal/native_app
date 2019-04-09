import Login from './Login'
import Splash from './Splash'
import Registration from './Registration'
import StudentDashboard from './StudentDashboard'
import {createStackNavigator, createAppContainer} from 'react-navigation'
const AppNavigator = createStackNavigator({
    //Screens   
    Splash: {
        screen: Splash
    },
    Login: {
        screen: Login
    },
    Registration:{
        screen:Registration
    },
    StudentDashboard:{
        screen:StudentDashboard
    }
}, {
    //settings
    initialRouteName: 'Splash'
})
// const defaultStackGetStateForAction =
//   AppNavigator.router.getStateForAction;

// AppNavigator.router.getStateForAction = (action, state) => {
//   if(state.index === 0 && action.type === NavigationActions.BACK){
//     BackHandler.exitApp();
//     return null;
//   }

//   return defaultStackGetStateForAction(action, state);
// };
export default createAppContainer(AppNavigator)
//SWITCH SIMILAR TO NOTIFICATION TOGGLE

import React, {useState} from 'react';
import { View, Switch} from 'react-native';

function TestScreen(props) {
 
    const[isEnabled, setIsEnabled] = useState(false)

    return (
        <View style={{flex:1, marginTop:100}}>
            <Switch value={isEnabled} onValueChange={
                (input => setIsEnabled(input))
            }
            />
        </View>

    );
}

export default TestScreen;
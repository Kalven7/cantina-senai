import {View, TextInput, StyleSheet } from 'react-native';
import React from 'react';
 
const CustomInput = ({ value, setValue, placeholder, secureTextEntry, editable, isDisabled }) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                editable={editable}
                disabled={isDisabled}
            />
        </View>
    )
}
 
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        width: '100%',
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        borderRadius: 5,
    },
    input: {
        padding: 15,
        fontWeight: 'bold',
    }
})
 
export default CustomInput;
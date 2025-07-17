import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProfileCard = ({ data }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: data.image }} style={styles.image} />
            <Text style={styles.name}>{data.name}</Text>
            <Text style={styles.details}>{data.details}</Text>
            <View style={styles.actions}>
                <View><TouchableOpacity style={styles.iconBtn}><Entypo name="cross" size={34} color="red" /></TouchableOpacity> <Text style={{ fontSize: 12 }}>Not Now</Text></View>

                <View><TouchableOpacity style={styles.iconBtn}><AntDesign name="hearto" size={30} color="black" /></TouchableOpacity><Text style={{ fontSize: 12 }}>Shortlist</Text></View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}><TouchableOpacity style={[styles.iconBtn]}><FontAwesome5 name="telegram-plane" size={32} color="#2BD2FF" /></TouchableOpacity><Text style={{ fontSize: 12, justifyContent: 'center' }}>Send Connection</Text></View>
            </View>
        </View>
    );
};

const CARD_WIDTH = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        marginRight: 14,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
        margin: 2
    },
    image: { width: '100%', height: 150, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
    name: { fontSize: 15, fontWeight: '600', marginTop: 8, marginLeft: 10 },
    details: { fontSize: 12, color: '#666', marginTop: 2, marginLeft: 10 },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 12,
    },
    iconBtn: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        width: 50,
        height: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default ProfileCard;

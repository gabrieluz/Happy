import React, {useState} from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'

import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import mapMarker from '../images/map-marker.png'
import api from '../services/api';


interface orphanageItem{
    id: number
    name: String
    latitude:number
    longitude: number
}

export default function orphanagesMap(){
    const navigation = useNavigation()

    const [orphanages, setOrphanages] = useState<orphanageItem[]>([])

    useFocusEffect(()=>{
            api.get('orphanages').then(response => {
            setOrphanages(response.data)
        })
    })

    function handleNavigationToOrphanageDetails(id:number){
        navigation.navigate('orphanageDetails', {id})
    }
    function handleNavigationToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }
    return (
    <View style={styles.container}>

        <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: -23.5126189,
                longitude: - 46.4116428,
                latitudeDelta: 0.008,
                longitudeDelta: 0.008
            }}>
            {orphanages.map(orphanage =>{
                return(
                    <Marker
                        key={orphanage.id}
                        icon={mapMarker}
                        coordinate={{
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude,
                        }}
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.8
                        }}
                    >
                        <Callout tooltip onPress={() => handleNavigationToOrphanageDetails(orphanage.id)}>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutText}> {orphanage.name} </Text>
                            </View>
                        </Callout>
                    </Marker>
                )
            })

            }
        </MapView>
        <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>

            <RectButton style={styles.createOrphanage} onPress={handleNavigationToCreateOrphanage}>
                <Feather name="plus" size={20} color='#fff' />
            </RectButton>
        </View>
    </View>

)}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 16,
        justifyContent: 'center',
        elevation: 3
    },
    calloutText: {
        color: '#0089a5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold'
    },
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,
        backgroundColor: '#fff',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3
    },
    footerText: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_700Bold'
    },
    createOrphanage: {
        width: 56,
        height: 56,
        backgroundColor: '#15c3d6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


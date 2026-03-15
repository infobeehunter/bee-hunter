// PartnersScreen.js
import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'reac
import { COLORS } from './AppColors';
const PARTNERS_DATA = [
 { id: '1', name: 'Panificio Fiore', type: 'Food', rating: '4.9', image: 'focac
 { id: '2', name: 'Bari Boat Tour', type: 'Sea', rating: '4.8', image: 'boat.j
 { id: '3', name: 'Velo Service', type: 'Bike', rating: '4.7', image: 'bike.js
];
const PartnerCard = ({ item }) => (
 <TouchableOpacity style={styles.card}>
 <Image source={{ uri: item.image }} style={styles.cardImage} />
 <View style={styles.cardInfo}>
 <Text style={styles.partnerName}>{item.name}</Text>
 <Text style={styles.partnerType}>{item.type} • ⭐ {item.rating}</Text>
 <View style={styles.rewardBadge}>
 <Text style={styles.rewardText}>{item.reward}</Text>
 </View>
 </View>
 </TouchableOpacity>
);
export default function PartnersScreen() {
 return (
 <View style={styles.container}>
 <Text style={styles.sectionTitle}>Consigli degli Hunter 🐝</Text>
 <FlatList
 data={PARTNERS_DATA}
 renderItem={({ item }) => <PartnerCard item={item} />}
 keyExtractor={item => item.id}
 contentContainerStyle={styles.list}
 />
 </View>
 );
}
const styles = StyleSheet.create({
 container: { flex: 1, backgroundColor: COLORS.light, padding: 20 },
 sectionTitle: { fontSize: 24, fontWeight: 'bold', color: COLORS.dark, marginBo
 list: { paddingBottom: 20 },
 card: {
 flexDirection: 'row',
 backgroundColor: COLORS.gray,
 borderRadius: 15,
 marginBottom: 15,
 overflow: 'hidden',
 elevation: 3
 },
 cardImage: { width: 100, height: 100 },
 cardInfo: { padding: 15, flex: 1 },
 partnerName: { fontSize: 18, fontWeight: 'bold', color: COLORS.dark },
 partnerType: { color: '#666', marginTop: 5 },
 rewardBadge: {
 backgroundColor: COLORS.secondary,
 paddingHorizontal: 10,
 paddingVertical: 5,
 borderRadius: 5,
 marginTop: 10,
 alignSelf: 'flex-start'
 },
 rewardText: { fontWeight: 'bold', fontSize: 12, color: COLORS.dark }
});

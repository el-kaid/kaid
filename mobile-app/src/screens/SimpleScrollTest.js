import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const SimpleScrollTest = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0f172a' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, marginBottom: 20 }}>SCROLL TEST</Text>
        
        {Array.from({ length: 50 }, (_, i) => (
          <View 
            key={i} 
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: 20, 
              marginBottom: 10,
              borderRadius: 10 
            }}
          >
            <Text style={{ color: 'white', fontSize: 18 }}>Item {i + 1}</Text>
            <Text style={{ color: '#94a3b8' }}>
              This is content for item {i + 1}. Keep scrolling to see more items.
            </Text>
          </View>
        ))}
        
        <Text style={{ color: 'red', fontSize: 20, textAlign: 'center', padding: 30 }}>
          END OF LIST - ITEM 50
        </Text>
      </View>
    </ScrollView>
  );
};

export default SimpleScrollTest;
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FilterTabs = ({ filterOptions, activeFilter, onFilterChange }) => {
  const renderFilterButton = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === item.name && styles.activeFilterButton
      ]}
      onPress={() => onFilterChange(item.name)}
    >
      <LinearGradient
        colors={activeFilter === item.name ? ['#7D0A0A', '#764ba2'] : ['#fff', '#fff']}
        style={styles.filterGradient}
      >
        <Text style={[
          styles.filterButtonText,
          activeFilter === item.name && styles.activeFilterButtonText
        ]}>
          {item.name}
        </Text>
        {item.count > 0 && (
          <View style={[
            styles.filterCount,
            activeFilter === item.name && styles.activeFilterCount
          ]}>
            <Text style={[
              styles.filterCountText,
              activeFilter === item.name && styles.activeFilterCountText
            ]}>
              {item.count}
            </Text>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.filtersContainer}>
      <FlatList
        data={filterOptions}
        renderItem={renderFilterButton}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    paddingVertical: 8,
  },
  filtersContent: {
    paddingHorizontal: 8,
  },
  filterButton: {
    marginRight: 6,
    borderRadius: 25,
    overflow: 'hidden',
  },
  filterGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeFilterButton: {
    borderColor: 'transparent',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  activeFilterButtonText: {
    color: '#fff',
  },
  filterCount: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 8,
  },
  activeFilterCount: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterCountText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  activeFilterCountText: {
    color: '#fff',
  },
});

export default FilterTabs;

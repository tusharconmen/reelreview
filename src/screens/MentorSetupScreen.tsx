import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MentorService } from '../types';
import { mentorServices } from '../data/dummyData';

interface MentorSetupScreenProps {
  mentorServices: MentorService[];
  onServicesChange: (services: MentorService[]) => void;
  followerCount: number;
}

export const MentorSetupScreen: React.FC<MentorSetupScreenProps> = ({
  mentorServices: currentServices,
  onServicesChange,
  followerCount,
}) => {
  const [services, setServices] = useState<MentorService[]>(currentServices);

  const updateService = (serviceId: string, updates: Partial<MentorService>) => {
    const updatedServices = services.map(service =>
      service.id === serviceId ? { ...service, ...updates } : service
    );
    setServices(updatedServices);
    onServicesChange(updatedServices);
  };

  const toggleService = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      updateService(serviceId, { isActive: !service.isActive });
    }
  };

  const updatePrice = (serviceId: string, price: string) => {
    const numericPrice = parseFloat(price) || 0;
    updateService(serviceId, { basePrice: numericPrice });
  };

  const updatePricePerMinute = (serviceId: string, price: string) => {
    const numericPrice = parseFloat(price) || 0;
    updateService(serviceId, { pricePerMinute: numericPrice });
  };

  const isEligibleForMentor = followerCount >= 10000;

  if (!isEligibleForMentor) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="people" size={48} color="#6B7280" />
          </View>
          <Text style={styles.title}>Mentor Setup</Text>
          <Text style={styles.subtitle}>
            You need at least 10,000 followers to become a mentor
          </Text>
          <Text style={styles.followerCount}>
            Current followers: {followerCount.toLocaleString()}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Ionicons name="star" size={48} color="#3B82F6" />
        </View>
        <Text style={styles.title}>Set Up Your Services</Text>
        <Text style={styles.subtitle}>
          Configure your reel review and video call consultation pricing
        </Text>
        <Text style={styles.followerCount}>
          You have {followerCount.toLocaleString()} followers - you're eligible!
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceHeader}>
              <View style={styles.serviceInfo}>
                <View style={styles.serviceTitleRow}>
                  <Ionicons 
                    name={service.name === 'Reel Review' ? 'videocam' : 'videocam-outline'} 
                    size={24} 
                    color={service.isActive ? '#3B82F6' : '#6B7280'} 
                  />
                  <Text style={[styles.serviceName, service.isActive && styles.activeServiceName]}>
                    {service.name}
                  </Text>
                </View>
                <Text style={styles.serviceDescription}>{service.description}</Text>
              </View>
              <Switch
                value={service.isActive}
                onValueChange={() => toggleService(service.id)}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={service.isActive ? '#FFFFFF' : '#FFFFFF'}
              />
            </View>

            {service.isActive && (
              <View style={styles.pricingSection}>
                <View style={styles.priceInputContainer}>
                  <Text style={styles.priceLabel}>Base Price</Text>
                  <View style={styles.priceInput}>
                    <Text style={styles.currencySymbol}>{service.currency}</Text>
                    <TextInput
                      style={styles.priceTextInput}
                      value={service.basePrice.toString()}
                      onChangeText={(text) => updatePrice(service.id, text)}
                      keyboardType="numeric"
                      placeholder="0"
                    />
                  </View>
                </View>

                {service.pricePerMinute !== undefined && (
                  <View style={styles.priceInputContainer}>
                    <Text style={styles.priceLabel}>Price per Minute</Text>
                    <View style={styles.priceInput}>
                      <Text style={styles.currencySymbol}>{service.currency}</Text>
                      <TextInput
                        style={styles.priceTextInput}
                        value={service.pricePerMinute.toString()}
                        onChangeText={(text) => updatePricePerMinute(service.id, text)}
                        keyboardType="numeric"
                        placeholder="0"
                      />
                    </View>
                  </View>
                )}

                <View style={styles.totalPriceContainer}>
                  <Text style={styles.totalPriceLabel}>Total Price Range</Text>
                  <Text style={styles.totalPrice}>
                    {service.currency}{service.basePrice}
                    {service.pricePerMinute && ` - ${service.currency}${service.basePrice + (service.pricePerMinute * 30)}`}
                    {service.pricePerMinute && ' (30 min session)'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {services.filter(s => s.isActive).length}
            </Text>
            <Text style={styles.statLabel}>Active Services</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              ${services.filter(s => s.isActive).reduce((sum, s) => sum + s.basePrice, 0)}
            </Text>
            <Text style={styles.statLabel}>Starting Price</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {services.filter(s => s.isActive && s.pricePerMinute).length > 0 ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.statLabel}>Video Calls</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EBF4FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  followerCount: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  serviceInfo: {
    flex: 1,
    marginRight: 12,
  },
  serviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  activeServiceName: {
    color: '#3B82F6',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  pricingSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  priceInputContainer: {
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  priceInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    paddingHorizontal: 12,
  },
  currencySymbol: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 8,
  },
  priceTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 12,
  },
  totalPriceContainer: {
    backgroundColor: '#EBF4FF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  totalPriceLabel: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '500',
    marginBottom: 4,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

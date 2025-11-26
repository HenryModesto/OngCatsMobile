import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import AdoptionModal from '../components/AdoptionModal';

const { width } = Dimensions.get('window');

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleWhatsApp = () => {
    const phoneNumber = '5511999999999'; // ⚠️ SUBSTITUA
    Linking.openURL(`https://wa.me/${phoneNumber}`);
  };

  const handleSubmit = async (formData) => {
    setIsLoading(true);

    try {
      await addDoc(collection(db, 'adocoes'), {
        ...formData,
        dataSolicitacao: new Date().toISOString(),
        status: 'pendente',
      });

      setIsModalOpen(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar solicitação. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground
        source={require('../assets/images/fundoHome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              Doe Amor,{'\n'}doe o seu lar!{'\n'}Adote um gatinho
            </Text>

            <TouchableOpacity
              style={styles.adoptButton}
              onPress={handleOpenModal}
              activeOpacity={0.8}
            >
              <Text style={styles.adoptButtonText}>Quero Adotar</Text>
              <Ionicons name="paw" size={20} color="#fff" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.whatsappButton}
            onPress={handleWhatsApp}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-whatsapp" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <AdoptionModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />

      {showSuccess && (
        <View style={styles.successMessage}>
          <Ionicons name="paw" size={20} color="#fff" />
          <Text style={styles.successText}>
            Solicitação enviada com sucesso! Entraremos em contato.
          </Text>
        </View>
      )}

      {isLoading && (
        <Modal transparent visible={isLoading}>
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#6b40c7" />
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 32,
  },
  adoptButton: {
    width: '100%',
    maxWidth: 280,
    backgroundColor: '#1268AE',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  adoptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 8,
  },
  whatsappButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#25D366',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  successMessage: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: '#32c86e',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  successText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  loadingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
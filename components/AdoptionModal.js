import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AdoptionModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    temOutrosPets: '',
    motivacao: '',
  });
  
  const [showPetsPicker, setShowPetsPicker] = useState(false);

  const petsOptions = [
    { label: 'Não', value: 'nao' },
    { label: 'Sim, tenho gatos', value: 'sim-gatos' },
    { label: 'Sim, tenho cães', value: 'sim-caes' },
    { label: 'Sim, tenho gatos e cães', value: 'sim-ambos' },
  ];

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handlePetsSelect = (value) => {
    handleChange('temOutrosPets', value);
    setShowPetsPicker(false);
  };
  
  const getSelectedLabel = () => {
    const selected = petsOptions.find(opt => opt.value === formData.temOutrosPets);
    return selected ? selected.label : 'Selecione uma opção';
  };

  const handleSubmit = () => {
    if (
      !formData.nome ||
      !formData.email ||
      !formData.telefone ||
      !formData.endereco ||
      !formData.temOutrosPets ||
      !formData.motivacao
    ) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }
    onSubmit(formData);
  };

  return (
    <Modal
      visible={isOpen}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalOverlay}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={onClose}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
            style={styles.modalContent}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Ionicons name="close" size={24} color="#444" />
              </TouchableOpacity>

              <View style={styles.header}>
                <Ionicons name="paw" size={24} color="#6b40c7" />
                <Text style={styles.modalTitle}>Formulário de Adoção</Text>
              </View>

              <Text style={styles.modalSubtitle}>
                Preencha os dados abaixo para iniciar o processo de adoção
              </Text>

              <View style={styles.form}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>Nome completo *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Seu nome completo"
                    value={formData.nome}
                    onChangeText={(value) => handleChange('nome', value)}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>E-mail *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChangeText={(value) => handleChange('email', value)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Telefone/WhatsApp *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="(00) 00000-0000"
                    value={formData.telefone}
                    onChangeText={(value) => handleChange('telefone', value)}
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Endereço completo *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Rua, número, bairro, cidade"
                    value={formData.endereco}
                    onChangeText={(value) => handleChange('endereco', value)}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Já tem outros pets? *</Text>
                  <TouchableOpacity 
                    style={styles.selectButton}
                    onPress={() => setShowPetsPicker(true)}
                  >
                    <Text style={formData.temOutrosPets ? styles.selectedText : styles.placeholderText}>
                      {getSelectedLabel()}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                
                {/* Modal do Select Customizado */}
                <Modal
                  visible={showPetsPicker}
                  transparent={true}
                  animationType="fade"
                  onRequestClose={() => setShowPetsPicker(false)}
                >
                  <TouchableOpacity 
                    style={styles.pickerModalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowPetsPicker(false)}
                  >
                    <View style={styles.pickerModalContent}>
                      <View style={styles.pickerHeader}>
                        <Text style={styles.pickerTitle}>Já tem outros pets?</Text>
                        <TouchableOpacity onPress={() => setShowPetsPicker(false)}>
                          <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                      </View>
                      
                      {petsOptions.map((option) => (
                        <TouchableOpacity
                          key={option.value}
                          style={[
                            styles.pickerOption,
                            formData.temOutrosPets === option.value && styles.pickerOptionSelected
                          ]}
                          onPress={() => handlePetsSelect(option.value)}
                        >
                          <Text style={[
                            styles.pickerOptionText,
                            formData.temOutrosPets === option.value && styles.pickerOptionTextSelected
                          ]}>
                            {option.label}
                          </Text>
                          {formData.temOutrosPets === option.value && (
                            <Ionicons name="checkmark" size={20} color="#6b40c7" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </TouchableOpacity>
                </Modal>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>Por que você quer adotar? *</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Conte-nos um pouco sobre sua motivação..."
                    value={formData.motivacao}
                    onChangeText={(value) => handleChange('motivacao', value)}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                  />
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <Text style={styles.submitButtonText}>Enviar solicitação</Text>
                  <Ionicons name="paw" size={18} color="#fff" />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '90%',
    maxWidth: 380,
    borderRadius: 16,
    maxHeight: '85%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  scrollContent: {
    padding: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  modalSubtitle: {
    textAlign: 'center',
    fontSize: 12,
    color: '#666',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 13,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 90,
    paddingTop: 12,
  },
  selectButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#999',
  },
  selectedText: {
    fontSize: 14,
    color: '#333',
  },
  pickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pickerModalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
    padding: 20,
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pickerOption: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pickerOptionSelected: {
    backgroundColor: '#f0e6ff',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#333',
  },
  pickerOptionTextSelected: {
    color: '#6b40c7',
    fontWeight: '600',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  pickerPlaceholder: {
    color: '#999',
    fontSize: 14,
  },
  pickerItem: {
    color: '#333',
    fontSize: 14,
  },
  submitButton: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#6b40c7',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
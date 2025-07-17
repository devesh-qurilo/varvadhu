import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    profileFor: 'Myself',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: { day: '', month: '', year: '' },
    gender: '',
    
    // Religion Details
    religion: 'Hindu',
    willingToMarryFromOtherCaste: false,
    caste: '',
    community: '',
    subCommunity: '',
    motherTongue: '',
    
    // Personal Details
    maritalStatus: '',
    numberOfChildren: '',
    childrenLivingWithYou: '',
    height: '',
    familyType: '',
    familyStatus: '',
    familyIncome: '',
    diet: '',
    state: '',
    city: '',
    disability: '',
    
    // Professional Details
    highestEducation: '',
    employedIn: '',
    occupation: '',
    annualIncome: '',
    workLocation: '',
    stateProf: '',
    cityProf: '',
    
    // About Yourself
    aboutYourself: '',
    images: [],
  });

  const totalSteps = 5;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      updateFormData('images', [...formData.images, ...result.assets]);
    }
  };

  const completeRegistration = () => {
    Alert.alert('Success', 'Registration completed successfully!');
    console.log('Form Data:', formData);
    router.push('VerificationScreen');
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
      </View>
      <Text style={styles.progressText}>{currentStep} of {totalSteps}</Text>
    </View>
  );

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      <View style={styles.stepCircle}>
        <Text style={styles.stepNumber}>{currentStep}</Text>
      </View>
    </View>
  );

  const renderBasicDetails = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.stepTitle}>Basic Details</Text>
      <Text style={styles.subtitle}>Please provide your basic details:</Text>
      
      <Text style={styles.label}>Select a profile for</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.profileFor}
          onValueChange={(value) => updateFormData('profileFor', value)}
          style={styles.picker}
        >
          <Picker.Item label="Myself" value="Myself" />
          <Picker.Item label="Son" value="Son" />
          <Picker.Item label="Daughter" value="Daughter" />
          <Picker.Item label="Brother" value="Brother" />
          <Picker.Item label="Sister" value="Sister" />
        </Picker>
      </View>

      <Text style={styles.label}>First Name</Text>
      <TextInput
        style={styles.input}
        value={formData.firstName}
        onChangeText={(text) => updateFormData('firstName', text)}
        placeholder="Enter first name"
      />

      <Text style={styles.label}>Middle Name</Text>
      <TextInput
        style={styles.input}
        value={formData.middleName}
        onChangeText={(text) => updateFormData('middleName', text)}
        placeholder="Enter middle name"
      />

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style={styles.input}
        value={formData.lastName}
        onChangeText={(text) => updateFormData('lastName', text)}
        placeholder="Enter last name"
      />

      <Text style={styles.label}>Date Of Birth</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={[styles.input, styles.dateInput]}
          value={formData.dateOfBirth.day}
          onChangeText={(text) => updateFormData('dateOfBirth', {...formData.dateOfBirth, day: text})}
          placeholder="DD"
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          value={formData.dateOfBirth.month}
          onChangeText={(text) => updateFormData('dateOfBirth', {...formData.dateOfBirth, month: text})}
          placeholder="MM"
          keyboardType="numeric"
          maxLength={2}
        />
        <TextInput
          style={[styles.input, styles.dateInput]}
          value={formData.dateOfBirth.year}
          onChangeText={(text) => updateFormData('dateOfBirth', {...formData.dateOfBirth, year: text})}
          placeholder="YYYY"
          keyboardType="numeric"
          maxLength={4}
        />
      </View>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, formData.gender === 'Male' && styles.radioSelected]}
          onPress={() => updateFormData('gender', 'Male')}
        >
          <Text style={[styles.radioText, formData.gender === 'Male' && styles.radioTextSelected]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, formData.gender === 'Female' && styles.radioSelected]}
          onPress={() => updateFormData('gender', 'Female')}
        >
          <Text style={[styles.radioText, formData.gender === 'Female' && styles.radioTextSelected]}>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderReligionDetails = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.stepTitle}>Religion Details</Text>
      <Text style={styles.subtitle}>Please provide your religion details:</Text>

      <Text style={styles.label}>Religion</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.religion}
          onValueChange={(value) => updateFormData('religion', value)}
          style={styles.picker}
        >
          <Picker.Item label="Hindu" value="Hindu" />
          <Picker.Item label="Muslim" value="Muslim" />
          <Picker.Item label="Christian" value="Christian" />
          <Picker.Item label="Sikh" value="Sikh" />
          <Picker.Item label="Buddhist" value="Buddhist" />
          <Picker.Item label="Jain" value="Jain" />
        </Picker>
      </View>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, formData.willingToMarryFromOtherCaste && styles.checkboxSelected]}
          onPress={() => updateFormData('willingToMarryFromOtherCaste', !formData.willingToMarryFromOtherCaste)}
        >
          {formData.willingToMarryFromOtherCaste && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>Willing to marry from other caste also</Text>
      </View>

      <Text style={styles.label}>Caste</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.caste}
          onValueChange={(value) => updateFormData('caste', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Caste" value="" />
          <Picker.Item label="Brahmin" value="Brahmin" />
          <Picker.Item label="Kshatriya" value="Kshatriya" />
          <Picker.Item label="Vaishya" value="Vaishya" />
          <Picker.Item label="Shudra" value="Shudra" />
        </Picker>
      </View>

      <Text style={styles.label}>Community</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.community}
          onValueChange={(value) => updateFormData('community', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Community" value="" />
          <Picker.Item label="Agarwal" value="Agarwal" />
          <Picker.Item label="Baniya" value="Baniya" />
          <Picker.Item label="Gupta" value="Gupta" />
        </Picker>
      </View>

      <Text style={styles.label}>Sub Community</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.subCommunity}
          onValueChange={(value) => updateFormData('subCommunity', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Sub Community" value="" />
          <Picker.Item label="Sub Community 1" value="SubCommunity1" />
          <Picker.Item label="Sub Community 2" value="SubCommunity2" />
        </Picker>
      </View>

      <Text style={styles.label}>Mother Tongue</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.motherTongue}
          onValueChange={(value) => updateFormData('motherTongue', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Mother Tongue" value="" />
          <Picker.Item label="Hindi" value="Hindi" />
          <Picker.Item label="English" value="English" />
          <Picker.Item label="Bengali" value="Bengali" />
          <Picker.Item label="Tamil" value="Tamil" />
          <Picker.Item label="Telugu" value="Telugu" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderPersonalDetails = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.stepTitle}>Personal Details</Text>
      <Text style={styles.subtitle}>Please provide your personal details:</Text>

      <Text style={styles.label}>Marital Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.maritalStatus}
          onValueChange={(value) => updateFormData('maritalStatus', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Status" value="" />
          <Picker.Item label="Never Married" value="Never Married" />
          <Picker.Item label="Divorced" value="Divorced" />
          <Picker.Item label="Widowed" value="Widowed" />
          <Picker.Item label="Awaiting Divorce" value="Awaiting Divorce" />
          <Picker.Item label="Annulled" value="Annulled" />
        </Picker>
      </View>

      <Text style={styles.label}>No Of Children</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.numberOfChildren}
          onValueChange={(value) => updateFormData('numberOfChildren', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select" value="" />
          <Picker.Item label="0" value="0" />
          <Picker.Item label="1" value="1" />
          <Picker.Item label="2" value="2" />
          <Picker.Item label="3+" value="3+" />
        </Picker>
      </View>

      <Text style={styles.label}>Is Children living with you?</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, formData.childrenLivingWithYou === 'Yes' && styles.radioSelected]}
          onPress={() => updateFormData('childrenLivingWithYou', 'Yes')}
        >
          <Text style={[styles.radioText, formData.childrenLivingWithYou === 'Yes' && styles.radioTextSelected]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, formData.childrenLivingWithYou === 'No' && styles.radioSelected]}
          onPress={() => updateFormData('childrenLivingWithYou', 'No')}
        >
          <Text style={[styles.radioText, formData.childrenLivingWithYou === 'No' && styles.radioTextSelected]}>No</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Height</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.height}
          onValueChange={(value) => updateFormData('height', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Height" value="" />
          {/* <Picker.Item label="5'0\"" value="5'0\"" />
          <Picker.Item label="5'1\"" value="5'1\"" />
          <Picker.Item label="5'2\"" value="5'2\"" />
          <Picker.Item label="5'3\"" value="5'3\"" />
          <Picker.Item label="5'4\"" value="5'4\"" />
          <Picker.Item label="5'5\"" value="5'5\"" />
          <Picker.Item label="5'6\"" value="5'6\"" />
          <Picker.Item label="5'7\"" value="5'7\"" />
          <Picker.Item label="5'8\"" value="5'8\"" />
          <Picker.Item label="5'9\"" value="5'9\"" />
          <Picker.Item label="5'10\"" value="5'10\"" />
          <Picker.Item label="5'11\"" value="5'11\"" />
          <Picker.Item label="6'0\"" value="6'0\"" /> */}
        </Picker>
      </View>

      <Text style={styles.label}>Family Type</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, formData.familyType === 'Joint' && styles.radioSelected]}
          onPress={() => updateFormData('familyType', 'Joint')}
        >
          <Text style={[styles.radioText, formData.familyType === 'Joint' && styles.radioTextSelected]}>Joint</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, formData.familyType === 'Nuclear' && styles.radioSelected]}
          onPress={() => updateFormData('familyType', 'Nuclear')}
        >
          <Text style={[styles.radioText, formData.familyType === 'Nuclear' && styles.radioTextSelected]}>Nuclear</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Family Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.familyStatus}
          onValueChange={(value) => updateFormData('familyStatus', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Family Status" value="" />
          <Picker.Item label="Middle Class" value="Middle Class" />
          <Picker.Item label="Upper Middle Class" value="Upper Middle Class" />
          <Picker.Item label="Rich" value="Rich" />
        </Picker>
      </View>

      <Text style={styles.label}>Family Income</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.familyIncome}
          onValueChange={(value) => updateFormData('familyIncome', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Family Income" value="" />
          <Picker.Item label="Less than 1 Lakh" value="Less than 1 Lakh" />
          <Picker.Item label="1-5 Lakhs" value="1-5 Lakhs" />
          <Picker.Item label="5-10 Lakhs" value="5-10 Lakhs" />
          <Picker.Item label="10-20 Lakhs" value="10-20 Lakhs" />
          <Picker.Item label="20+ Lakhs" value="20+ Lakhs" />
        </Picker>
      </View>

      <Text style={styles.label}>Diet</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.diet}
          onValueChange={(value) => updateFormData('diet', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Diet" value="" />
          <Picker.Item label="Vegetarian" value="Vegetarian" />
          <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
          <Picker.Item label="Vegan" value="Vegan" />
          <Picker.Item label="Jain" value="Jain" />
        </Picker>
      </View>

      <Text style={styles.label}>State</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.state}
          onValueChange={(value) => updateFormData('state', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select State" value="" />
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Mumbai" value="Mumbai" />
          <Picker.Item label="Bangalore" value="Bangalore" />
          <Picker.Item label="Chennai" value="Chennai" />
          <Picker.Item label="Hyderabad" value="Hyderabad" />
        </Picker>
      </View>

      <Text style={styles.label}>City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.city}
          onValueChange={(value) => updateFormData('city', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select City" value="" />
          <Picker.Item label="New Delhi" value="New Delhi" />
          <Picker.Item label="Mumbai" value="Mumbai" />
          <Picker.Item label="Bangalore" value="Bangalore" />
          <Picker.Item label="Chennai" value="Chennai" />
          <Picker.Item label="Hyderabad" value="Hyderabad" />
        </Picker>
      </View>

      <Text style={styles.label}>Any Disability</Text>
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, formData.disability === 'Yes' && styles.radioSelected]}
          onPress={() => updateFormData('disability', 'Yes')}
        >
          <Text style={[styles.radioText, formData.disability === 'Yes' && styles.radioTextSelected]}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, formData.disability === 'No' && styles.radioSelected]}
          onPress={() => updateFormData('disability', 'No')}
        >
          <Text style={[styles.radioText, formData.disability === 'No' && styles.radioTextSelected]}>No</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderProfessionalDetails = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.stepTitle}>Professional Details</Text>
      <Text style={styles.subtitle}>Please provide your professional details:</Text>

      <Text style={styles.label}>Highest Education</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.highestEducation}
          onValueChange={(value) => updateFormData('highestEducation', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Education" value="" />
          <Picker.Item label="High School" value="High School" />
          <Picker.Item label="Bachelor's Degree" value="Bachelor's Degree" />
          <Picker.Item label="Master's Degree" value="Master's Degree" />
          <Picker.Item label="PhD" value="PhD" />
          <Picker.Item label="Professional Degree" value="Professional Degree" />
        </Picker>
      </View>

      <Text style={styles.label}>Employed In</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.employedIn}
          onValueChange={(value) => updateFormData('employedIn', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Employment" value="" />
          <Picker.Item label="Private Company" value="Private Company" />
          <Picker.Item label="Government" value="Government" />
          <Picker.Item label="Business" value="Business" />
          <Picker.Item label="Self Employed" value="Self Employed" />
          <Picker.Item label="Not Working" value="Not Working" />
        </Picker>
      </View>

      <Text style={styles.label}>Occupation</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.occupation}
          onValueChange={(value) => updateFormData('occupation', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Occupation" value="" />
          <Picker.Item label="Software Engineer" value="Software Engineer" />
          <Picker.Item label="Doctor" value="Doctor" />
          <Picker.Item label="Teacher" value="Teacher" />
          <Picker.Item label="Businessman" value="Businessman" />
          <Picker.Item label="Engineer" value="Engineer" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Annual Income (Rs.)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.annualIncome}
          onValueChange={(value) => updateFormData('annualIncome', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Annual Income" value="" />
          <Picker.Item label="Less than 2 Lakhs" value="Less than 2 Lakhs" />
          <Picker.Item label="2-5 Lakhs" value="2-5 Lakhs" />
          <Picker.Item label="5-10 Lakhs" value="5-10 Lakhs" />
          <Picker.Item label="10-20 Lakhs" value="10-20 Lakhs" />
          <Picker.Item label="20-50 Lakhs" value="20-50 Lakhs" />
          <Picker.Item label="50+ Lakhs" value="50+ Lakhs" />
        </Picker>
      </View>

      <Text style={styles.label}>Work Location</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.workLocation}
          onValueChange={(value) => updateFormData('workLocation', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Work Location" value="" />
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Mumbai" value="Mumbai" />
          <Picker.Item label="Bangalore" value="Bangalore" />
          <Picker.Item label="Chennai" value="Chennai" />
          <Picker.Item label="Hyderabad" value="Hyderabad" />
          <Picker.Item label="Remote" value="Remote" />
        </Picker>
      </View>

      <Text style={styles.label}>State</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.stateProf}
          onValueChange={(value) => updateFormData('stateProf', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select State" value="" />
          <Picker.Item label="Delhi" value="Delhi" />
          <Picker.Item label="Maharashtra" value="Maharashtra" />
          <Picker.Item label="Karnataka" value="Karnataka" />
          <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
          <Picker.Item label="Telangana" value="Telangana" />
        </Picker>
      </View>

      <Text style={styles.label}>City</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.cityProf}
          onValueChange={(value) => updateFormData('cityProf', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select City" value="" />
          <Picker.Item label="New Delhi" value="New Delhi" />
          <Picker.Item label="Mumbai" value="Mumbai" />
          <Picker.Item label="Bangalore" value="Bangalore" />
          <Picker.Item label="Chennai" value="Chennai" />
          <Picker.Item label="Hyderabad" value="Hyderabad" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderAboutYourself = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.stepTitle}>About Yourself</Text>
      <Text style={styles.subtitle}>Please provide your about yourself:</Text>

      <Text style={styles.label}>About Yourself</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={formData.aboutYourself}
        onChangeText={(text) => updateFormData('aboutYourself', text)}
        placeholder="Tell us about yourself..."
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Upload Image (Max. 3 images)</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadText}>📷</Text>
        <Text style={styles.uploadLabel}>Drag & drop files here</Text>
        <Text style={styles.uploadSubLabel}>(or)</Text>
      </TouchableOpacity>

      {formData.images.length > 0 && (
        <Text style={styles.imageCount}>{formData.images.length} image(s) selected</Text>
      )}

      <TouchableOpacity style={styles.completeButton} onPress={completeRegistration}>
        <Text style={styles.buttonText}>Complete Registration</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicDetails();
      case 2:
        return renderReligionDetails();
      case 3:
        return renderPersonalDetails();
      case 4:
        return renderProfessionalDetails();
      case 5:
        return renderAboutYourself();
      default:
        return renderBasicDetails();
    }
  };

  const getStepTitle = () => {
    const titles = ['Basic Details', 'Religion Details', 'Personal Details', 'Professional Details', 'About Yourself'];
    return titles[currentStep - 1];
  };

  const getNextStepTitle = () => {
    const titles = ['Religion Details', 'Personal Details', 'Professional Details', 'About Yourself', ''];
    return titles[currentStep - 1];
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        {currentStep > 1 && (
          <TouchableOpacity onPress={prevStep} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
        
        {renderStepIndicator()}
        <View>
        <Text style={styles.headerTitle}>{getStepTitle()}</Text>
        {/* {renderStepIndicator()} */}
        {getNextStepTitle() && (
          <Text style={styles.nextStep}>Next Step: {getNextStepTitle()}</Text>
        )}
        </View>
      </View>

      {renderProgressBar()}
      
      {renderCurrentStep()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    // borderWidth:5,
    // borderColor: '#000',
    // flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 15,
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#8B4513',
  },
  stepIndicator: {
    marginBottom: 10,
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#8B4513',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  nextStep: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginRight: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#991B1B',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8F0',
  },
  stepTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateInput: {
    flex: 1,
    marginRight: 10,
    marginBottom: 0,
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  radioButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  radioSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  },
  radioTextSelected: {
    color: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#8B4513',
    borderColor: '#8B4513',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  uploadButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    borderRadius: 8,
    paddingVertical: 40,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    fontSize: 40,
    marginBottom: 10,
  },
  uploadLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  uploadSubLabel: {
    fontSize: 14,
    color: '#999',
  },
  imageCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#991B1B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  completeButton: {
    backgroundColor: '#991B1B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MultiStepForm;




// import { Picker } from '@react-native-picker/picker';
// import * as ImagePicker from 'expo-image-picker';
// import { router } from 'expo-router';
// import React, { useState } from 'react';
// import {
//   Alert,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';

// const MultiStepForm = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     // Basic Details
//     profileFor: 'Myself',
//     firstName: '',
//     middleName: '',
//     lastName: '',
//     dateOfBirth: { day: '', month: '', year: '' },
//     gender: '',
    
//     // Religion Details
//     religion: 'Hindu',
//     willingToMarryFromOtherCaste: false,
//     caste: '',
//     community: '',
//     subCommunity: '',
//     motherTongue: '',
    
//     // Personal Details
//     maritalStatus: '',
//     numberOfChildren: '',
//     childrenLivingWithYou: '',
//     height: '',
//     familyType: '',
//     familyStatus: '',
//     familyIncome: '',
//     diet: '',
//     state: '',
//     city: '',
//     disability: '',
    
//     // Professional Details
//     highestEducation: '',
//     employedIn: '',
//     occupation: '',
//     annualIncome: '',
//     workLocation: '',
//     stateProf: '',
//     cityProf: '',
    
//     // About Yourself
//     aboutYourself: '',
//     images: [],
//   });

//   const totalSteps = 5;
//   const progressPercentage = (currentStep / totalSteps) * 100;

//   const updateFormData = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       updateFormData('images', [...formData.images, ...result.assets]);
//     }
//   };

//   const completeRegistration = () => {
//     Alert.alert('Success', 'Registration completed successfully!');
//     console.log('Form Data:', formData);
//     router.push('VerificationScreen');
//   };

//   const renderProgressBar = () => (
//     <View style={styles.progressContainer}>
//       <View style={styles.progressBar}>
//         <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
//       </View>
//       <Text style={styles.progressText}>{currentStep} of {totalSteps}</Text>
//     </View>
//   );

//   const renderStepIndicator = () => (
//     <View style={styles.stepIndicator}>
//       <View style={styles.stepCircle}>
//         <Text style={styles.stepNumber}>{currentStep}</Text>
//       </View>
//     </View>
//   );

//   const renderBasicDetails = () => (
//     <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
//       <Text style={styles.stepTitle}>Basic Details</Text>
//       <Text style={styles.subtitle}>Please provide your basic details:</Text>
      
//       <Text style={styles.label}>Select a profile for</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.profileFor}
//           onValueChange={(value) => updateFormData('profileFor', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Myself" value="Myself" />
//           <Picker.Item label="Son" value="Son" />
//           <Picker.Item label="Daughter" value="Daughter" />
//           <Picker.Item label="Brother" value="Brother" />
//           <Picker.Item label="Sister" value="Sister" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>First Name</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.firstName}
//         onChangeText={(text) => updateFormData('firstName', text)}
//         placeholder="Enter first name"
//         placeholderTextColor="#999"
//       />

//       <Text style={styles.label}>Middle Name</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.middleName}
//         onChangeText={(text) => updateFormData('middleName', text)}
//         placeholder="Enter middle name"
//         placeholderTextColor="#999"
//       />

//       <Text style={styles.label}>Last Name</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.lastName}
//         onChangeText={(text) => updateFormData('lastName', text)}
//         placeholder="Enter last name"
//         placeholderTextColor="#999"
//       />

//       <Text style={styles.label}>Date Of Birth</Text>
//       <View style={styles.dateContainer}>
//         <TextInput
//           style={[styles.input, styles.dateInput]}
//           value={formData.dateOfBirth.day}
//           onChangeText={(text) => updateFormData('dateOfBirth', {...formData.dateOfBirth, day: text})}
//           placeholder="DD"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           maxLength={2}
//         />
//         <TextInput
//           style={[styles.input, styles.dateInput]}
//           value={formData.dateOfBirth.month}
//           onChangeText={(text) => updateFormData('dateOfBirth', {...formData.dateOfBirth, month: text})}
//           placeholder="MM"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           maxLength={2}
//         />
//         <TextInput
//           style={[styles.input, styles.dateInput]}
//           value={formData.dateOfBirth.year}
//           onChangeText={(text) => updateFormData('dateOfBirth', {...formData.dateOfBirth, year: text})}
//           placeholder="YYYY"
//           placeholderTextColor="#999"
//           keyboardType="numeric"
//           maxLength={4}
//         />
//       </View>

//       <Text style={styles.label}>Gender</Text>
//       <View style={styles.radioContainer}>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.gender === 'Male' && styles.radioSelected]}
//           onPress={() => updateFormData('gender', 'Male')}
//         >
//           <Text style={[styles.radioText, formData.gender === 'Male' && styles.radioTextSelected]}>Male</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.gender === 'Female' && styles.radioSelected]}
//           onPress={() => updateFormData('gender', 'Female')}
//         >
//           <Text style={[styles.radioText, formData.gender === 'Female' && styles.radioTextSelected]}>Female</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderReligionDetails = () => (
//     <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
//       <Text style={styles.stepTitle}>Religion Details</Text>
//       <Text style={styles.subtitle}>Please provide your religion details:</Text>

//       <Text style={styles.label}>Religion</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.religion}
//           onValueChange={(value) => updateFormData('religion', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Hindu" value="Hindu" />
//           <Picker.Item label="Muslim" value="Muslim" />
//           <Picker.Item label="Christian" value="Christian" />
//           <Picker.Item label="Sikh" value="Sikh" />
//           <Picker.Item label="Buddhist" value="Buddhist" />
//           <Picker.Item label="Jain" value="Jain" />
//         </Picker>
//       </View>

//       <View style={styles.checkboxContainer}>
//         <TouchableOpacity
//           style={[styles.checkbox, formData.willingToMarryFromOtherCaste && styles.checkboxSelected]}
//           onPress={() => updateFormData('willingToMarryFromOtherCaste', !formData.willingToMarryFromOtherCaste)}
//         >
//           {formData.willingToMarryFromOtherCaste && <Text style={styles.checkmark}>✓</Text>}
//         </TouchableOpacity>
//         <Text style={styles.checkboxLabel}>Willing to marry from other caste also</Text>
//       </View>

//       <Text style={styles.label}>Caste</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.caste}
//           onValueChange={(value) => updateFormData('caste', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Caste" value="" />
//           <Picker.Item label="Brahmin" value="Brahmin" />
//           <Picker.Item label="Kshatriya" value="Kshatriya" />
//           <Picker.Item label="Vaishya" value="Vaishya" />
//           <Picker.Item label="Shudra" value="Shudra" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Community</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.community}
//           onValueChange={(value) => updateFormData('community', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Community" value="" />
//           <Picker.Item label="Agarwal" value="Agarwal" />
//           <Picker.Item label="Baniya" value="Baniya" />
//           <Picker.Item label="Gupta" value="Gupta" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Sub Community</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.subCommunity}
//           onValueChange={(value) => updateFormData('subCommunity', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Sub Community" value="" />
//           <Picker.Item label="Sub Community 1" value="SubCommunity1" />
//           <Picker.Item label="Sub Community 2" value="SubCommunity2" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Mother Tongue</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.motherTongue}
//           onValueChange={(value) => updateFormData('motherTongue', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Mother Tongue" value="" />
//           <Picker.Item label="Hindi" value="Hindi" />
//           <Picker.Item label="English" value="English" />
//           <Picker.Item label="Bengali" value="Bengali" />
//           <Picker.Item label="Tamil" value="Tamil" />
//           <Picker.Item label="Telugu" value="Telugu" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderPersonalDetails = () => (
//     <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
//       <Text style={styles.stepTitle}>Personal Details</Text>
//       <Text style={styles.subtitle}>Please provide your personal details:</Text>

//       <Text style={styles.label}>Marital Status</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.maritalStatus}
//           onValueChange={(value) => updateFormData('maritalStatus', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Status" value="" />
//           <Picker.Item label="Never Married" value="Never Married" />
//           <Picker.Item label="Divorced" value="Divorced" />
//           <Picker.Item label="Widowed" value="Widowed" />
//           <Picker.Item label="Awaiting Divorce" value="Awaiting Divorce" />
//           <Picker.Item label="Annulled" value="Annulled" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>No Of Children</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.numberOfChildren}
//           onValueChange={(value) => updateFormData('numberOfChildren', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select" value="" />
//           <Picker.Item label="0" value="0" />
//           <Picker.Item label="1" value="1" />
//           <Picker.Item label="2" value="2" />
//           <Picker.Item label="3+" value="3+" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Is Children living with you?</Text>
//       <View style={styles.radioContainer}>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.childrenLivingWithYou === 'Yes' && styles.radioSelected]}
//           onPress={() => updateFormData('childrenLivingWithYou', 'Yes')}
//         >
//           <Text style={[styles.radioText, formData.childrenLivingWithYou === 'Yes' && styles.radioTextSelected]}>Yes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.childrenLivingWithYou === 'No' && styles.radioSelected]}
//           onPress={() => updateFormData('childrenLivingWithYou', 'No')}
//         >
//           <Text style={[styles.radioText, formData.childrenLivingWithYou === 'No' && styles.radioTextSelected]}>No</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>Height</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.height}
//           onValueChange={(value) => updateFormData('height', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Height" value="" />
//           <Picker.Item label="5'0\" value="5'0\" />
//           <Picker.Item label="5'1\" value="5'1\" />
//           <Picker.Item label="5'2\" value="5'2\" />
//           <Picker.Item label="5'3\" value="5'3\" />
//           <Picker.Item label="5'4\" value="5'4\" />
//           <Picker.Item label="5'5\" value="5'5\" />
//           <Picker.Item label="5'6\" value="5'6\" />
//           <Picker.Item label="5'7\" value="5'7\" />
//           <Picker.Item label="5'8\" value="5'8\" />
//           <Picker.Item label="5'9\" value="5'9\" />
//           <Picker.Item label="5'10\" value="5'10\" />
//           <Picker.Item label="5'11\" value="5'11\" />
//           <Picker.Item label="6'0\" value="6'0\" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Family Type</Text>
//       <View style={styles.radioContainer}>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.familyType === 'Joint' && styles.radioSelected]}
//           onPress={() => updateFormData('familyType', 'Joint')}
//         >
//           <Text style={[styles.radioText, formData.familyType === 'Joint' && styles.radioTextSelected]}>Joint</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.familyType === 'Nuclear' && styles.radioSelected]}
//           onPress={() => updateFormData('familyType', 'Nuclear')}
//         >
//           <Text style={[styles.radioText, formData.familyType === 'Nuclear' && styles.radioTextSelected]}>Nuclear</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.label}>Family Status</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.familyStatus}
//           onValueChange={(value) => updateFormData('familyStatus', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Family Status" value="" />
//           <Picker.Item label="Middle Class" value="Middle Class" />
//           <Picker.Item label="Upper Middle Class" value="Upper Middle Class" />
//           <Picker.Item label="Rich" value="Rich" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Family Income</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.familyIncome}
//           onValueChange={(value) => updateFormData('familyIncome', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Family Income" value="" />
//           <Picker.Item label="Less than 1 Lakh" value="Less than 1 Lakh" />
//           <Picker.Item label="1-5 Lakhs" value="1-5 Lakhs" />
//           <Picker.Item label="5-10 Lakhs" value="5-10 Lakhs" />
//           <Picker.Item label="10-20 Lakhs" value="10-20 Lakhs" />
//           <Picker.Item label="20+ Lakhs" value="20+ Lakhs" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Diet</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.diet}
//           onValueChange={(value) => updateFormData('diet', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Diet" value="" />
//           <Picker.Item label="Vegetarian" value="Vegetarian" />
//           <Picker.Item label="Non-Vegetarian" value="Non-Vegetarian" />
//           <Picker.Item label="Vegan" value="Vegan" />
//           <Picker.Item label="Jain" value="Jain" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>State</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.state}
//           onValueChange={(value) => updateFormData('state', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select State" value="" />
//           <Picker.Item label="Delhi" value="Delhi" />
//           <Picker.Item label="Mumbai" value="Mumbai" />
//           <Picker.Item label="Bangalore" value="Bangalore" />
//           <Picker.Item label="Chennai" value="Chennai" />
//           <Picker.Item label="Hyderabad" value="Hyderabad" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>City</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.city}
//           onValueChange={(value) => updateFormData('city', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select City" value="" />
//           <Picker.Item label="New Delhi" value="New Delhi" />
//           <Picker.Item label="Mumbai" value="Mumbai" />
//           <Picker.Item label="Bangalore" value="Bangalore" />
//           <Picker.Item label="Chennai" value="Chennai" />
//           <Picker.Item label="Hyderabad" value="Hyderabad" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Any Disability</Text>
//       <View style={styles.radioContainer}>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.disability === 'Yes' && styles.radioSelected]}
//           onPress={() => updateFormData('disability', 'Yes')}
//         >
//           <Text style={[styles.radioText, formData.disability === 'Yes' && styles.radioTextSelected]}>Yes</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.radioButton, formData.disability === 'No' && styles.radioSelected]}
//           onPress={() => updateFormData('disability', 'No')}
//         >
//           <Text style={[styles.radioText, formData.disability === 'No' && styles.radioTextSelected]}>No</Text>
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderProfessionalDetails = () => (
//     <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
//       <Text style={styles.stepTitle}>Professional Details</Text>
//       <Text style={styles.subtitle}>Please provide your professional details:</Text>

//       <Text style={styles.label}>Highest Education</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.highestEducation}
//           onValueChange={(value) => updateFormData('highestEducation', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Education" value="" />
//           <Picker.Item label="High School" value="High School" />
//           <Picker.Item label="Bachelor's Degree" value="Bachelor's Degree" />
//           <Picker.Item label="Master's Degree" value="Master's Degree" />
//           <Picker.Item label="PhD" value="PhD" />
//           <Picker.Item label="Professional Degree" value="Professional Degree" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Employed In</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.employedIn}
//           onValueChange={(value) => updateFormData('employedIn', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Employment" value="" />
//           <Picker.Item label="Private Company" value="Private Company" />
//           <Picker.Item label="Government" value="Government" />
//           <Picker.Item label="Business" value="Business" />
//           <Picker.Item label="Self Employed" value="Self Employed" />
//           <Picker.Item label="Not Working" value="Not Working" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Occupation</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.occupation}
//           onValueChange={(value) => updateFormData('occupation', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Occupation" value="" />
//           <Picker.Item label="Software Engineer" value="Software Engineer" />
//           <Picker.Item label="Doctor" value="Doctor" />
//           <Picker.Item label="Teacher" value="Teacher" />
//           <Picker.Item label="Businessman" value="Businessman" />
//           <Picker.Item label="Engineer" value="Engineer" />
//           <Picker.Item label="Other" value="Other" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Annual Income (Rs.)</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.annualIncome}
//           onValueChange={(value) => updateFormData('annualIncome', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Annual Income" value="" />
//           <Picker.Item label="Less than 2 Lakhs" value="Less than 2 Lakhs" />
//           <Picker.Item label="2-5 Lakhs" value="2-5 Lakhs" />
//           <Picker.Item label="5-10 Lakhs" value="5-10 Lakhs" />
//           <Picker.Item label="10-20 Lakhs" value="10-20 Lakhs" />
//           <Picker.Item label="20-50 Lakhs" value="20-50 Lakhs" />
//           <Picker.Item label="50+ Lakhs" value="50+ Lakhs" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Work Location</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.workLocation}
//           onValueChange={(value) => updateFormData('workLocation', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select Work Location" value="" />
//           <Picker.Item label="Delhi" value="Delhi" />
//           <Picker.Item label="Mumbai" value="Mumbai" />
//           <Picker.Item label="Bangalore" value="Bangalore" />
//           <Picker.Item label="Chennai" value="Chennai" />
//           <Picker.Item label="Hyderabad" value="Hyderabad" />
//           <Picker.Item label="Remote" value="Remote" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>State</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.stateProf}
//           onValueChange={(value) => updateFormData('stateProf', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select State" value="" />
//           <Picker.Item label="Delhi" value="Delhi" />
//           <Picker.Item label="Maharashtra" value="Maharashtra" />
//           <Picker.Item label="Karnataka" value="Karnataka" />
//           <Picker.Item label="Tamil Nadu" value="Tamil Nadu" />
//           <Picker.Item label="Telangana" value="Telangana" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>City</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={formData.cityProf}
//           onValueChange={(value) => updateFormData('cityProf', value)}
//           style={styles.picker}
//           itemStyle={styles.pickerItem}
//         >
//           <Picker.Item label="Select City" value="" />
//           <Picker.Item label="New Delhi" value="New Delhi" />
//           <Picker.Item label="Mumbai" value="Mumbai" />
//           <Picker.Item label="Bangalore" value="Bangalore" />
//           <Picker.Item label="Chennai" value="Chennai" />
//           <Picker.Item label="Hyderabad" value="Hyderabad" />
//         </Picker>
//       </View>

//       <TouchableOpacity style={styles.continueButton} onPress={nextStep}>
//         <Text style={styles.buttonText}>Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderAboutYourself = () => (
//     <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
//       <Text style={styles.stepTitle}>About Yourself</Text>
//       <Text style={styles.subtitle}>Please provide your about yourself:</Text>

//       <Text style={styles.label}>About Yourself</Text>
//       <TextInput
//         style={[styles.input, styles.textArea]}
//         value={formData.aboutYourself}
//         onChangeText={(text) => updateFormData('aboutYourself', text)}
//         placeholder="Tell us about yourself..."
//         placeholderTextColor="#999"
//         multiline
//         numberOfLines={6}
//         textAlignVertical="top"
//       />

//       <Text style={styles.label}>Upload Image (Max. 3 images)</Text>
//       <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
//         <Text style={styles.uploadText}>📷</Text>
//         <Text style={styles.uploadLabel}>Drag & drop files here</Text>
//         <Text style={styles.uploadSubLabel}>(or)</Text>
//       </TouchableOpacity>

//       {formData.images.length > 0 && (
//         <Text style={styles.imageCount}>{formData.images.length} image(s) selected</Text>
//       )}

//       <TouchableOpacity style={styles.completeButton} onPress={completeRegistration}>
//         <Text style={styles.buttonText}>Complete Registration</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );

//   const renderCurrentStep = () => {
//     switch (currentStep) {
//       case 1:
//         return renderBasicDetails();
//       case 2:
//         return renderReligionDetails();
//       case 3:
//         return renderPersonalDetails();
//       case 4:
//         return renderProfessionalDetails();
//       case 5:
//         return renderAboutYourself();
//       default:
//         return renderBasicDetails();
//     }
//   };

//   const getStepTitle = () => {
//     const titles = ['Basic Details', 'Religion Details', 'Personal Details', 'Professional Details', 'About Yourself'];
//     return titles[currentStep - 1];
//   };

//   const getNextStepTitle = () => {
//     const titles = ['Religion Details', 'Personal Details', 'Professional Details', 'About Yourself', ''];
//     return titles[currentStep - 1];
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Text style={styles.backButton}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Create Profile</Text>
//       </View>

//       {/* Progress Bar */}
//       {renderProgressBar()}

//       {/* Step Indicator */}
//       {renderStepIndicator()}

//       {/* Form Content */}
//       {renderCurrentStep()}

//       {/* Navigation Buttons */}
//       {currentStep > 1 && (
//         <View style={styles.navigationContainer}>
//           <TouchableOpacity style={styles.backStepButton} onPress={prevStep}>
//             <Text style={styles.backStepText}>Back</Text>
//           </TouchableOpacity>
//           {currentStep < totalSteps && (
//             <TouchableOpacity style={styles.nextStepButton} onPress={nextStep}>
//               <Text style={styles.nextStepText}>Next: {getNextStepTitle()}</Text>
//             </TouchableOpacity>
//           )}
//         </View>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   backButton: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginRight: 15,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   progressContainer: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
//   progressBar: {
//     height: 4,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 2,
//     marginBottom: 8,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#ff6b6b',
//     borderRadius: 2,
//   },
//   progressText: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//   },
//   stepIndicator: {
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   stepCircle: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#ff6b6b',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   stepNumber: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   formContainer: {
//     flex: 1,
//     paddingHorizontal: 20,
//   },
//   stepTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 8,
//     marginTop: 15,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     paddingVertical: 12,
//     fontSize: 16,
//     backgroundColor: '#fafafa',
//     marginBottom: 5,
//   },
//   textArea: {
//     height: 120,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     backgroundColor: '#fafafa',
//     marginBottom: 5,
//   },
//   picker: {
//     height: 50,
//     ...Platform.select({
//       ios: {
//         paddingHorizontal: 15,
//       },
//       android: {
//         paddingHorizontal: 10,
//       },
//     }),
//   },
//   pickerItem: {
//     fontSize: 16,
//   },
//   dateContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 10,
//   },
//   dateInput: {
//     flex: 1,
//     textAlign: 'center',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     gap: 15,
//     marginBottom: 5,
//   },
//   radioButton: {
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#fafafa',
//   },
//   radioSelected: {
//     backgroundColor: '#ff6b6b',
//     borderColor: '#ff6b6b',
//   },
//   radioText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   radioTextSelected: {
//     color: '#fff',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 4,
//     marginRight: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   checkboxSelected: {
//     backgroundColor: '#ff6b6b',
//     borderColor: '#ff6b6b',
//   },
//   checkmark: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   checkboxLabel: {
//     fontSize: 16,
//     color: '#333',
//   },
//   uploadButton: {
//     borderWidth: 2,
//     borderColor: '#ddd',
//     borderStyle: 'dashed',
//     borderRadius: 8,
//     paddingVertical: 40,
//     alignItems: 'center',
//     backgroundColor: '#fafafa',
//     marginBottom: 10,
//   },
//   uploadText: {
//     fontSize: 24,
//     marginBottom: 10,
//   },
//   uploadLabel: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 5,
//   },
//   uploadSubLabel: {
//     fontSize: 14,
//     color: '#999',
//   },
//   imageCount: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 20,
//   },
//   continueButton: {
//     backgroundColor: '#ff6b6b',
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   completeButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 8,
//     paddingVertical: 15,
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   navigationContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderTopColor: '#f0f0f0',
//   },
//   backStepButton: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   backStepText: {
//     color: '#333',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   nextStepButton: {
//     backgroundColor: '#ff6b6b',
//     borderRadius: 8,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//   },
//   nextStepText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default MultiStepForm;
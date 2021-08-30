package com.cognizant.user.controller;

import static org.junit.Assert.assertThrows;
import static org.junit.Assert.assertTrue;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.cognizant.user.entity.User;
import com.cognizant.user.entity.UserDetail;
import com.cognizant.user.mock.UserMockData;
import com.cognizant.user.service.UserService;

@ExtendWith(MockitoExtension.class)
class UserTestController {
	
	@InjectMocks
	UserController userController;
	
	@Mock
	UserService userService;

	UserMockData userMockData;
	
	@BeforeEach
	public void setUp() throws Exception {
		userMockData = new UserMockData();
	}

	@AfterEach
	public void tearDown() throws Exception {
	}
	
	@Test
	void testRegisterUser() {
		User userData = userMockData.getUserMockData().get(0);
		
		User value = new User();
		Mockito.when(userService.register(userData)).thenReturn(value);
		
		ResponseEntity<?> responseEntity = userController.saveUser(userData);
		Assert.assertNotNull(responseEntity);

	}
	
	@Test
	void testUpdateUser() {
		UserDetail userDetailData = userMockData.getUserDetailMockData();
		
		UserDetail value = new UserDetail();
		
		Mockito.when(userService.save(userDetailData)).thenReturn(value);
		
		ResponseEntity<?> responseEntity = userController.updateUser("R-190", userDetailData);
		Assert.assertNotNull(responseEntity);
	}

}

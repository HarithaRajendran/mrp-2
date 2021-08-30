package com.cognizant.claimservice.service;

import org.junit.Assert;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import com.cognizant.claim.entity.Claim;
import com.cognizant.claim.repository.ClaimRepository;
import com.cognizant.claim.service.ClaimService;
import com.cognizant.claimservice.mock.ClaimMockData;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
class ClaimTestService {
	
	@InjectMocks
	ClaimService claimService;
	
	@Mock
	ClaimRepository claimRepository;

	ClaimMockData claimMockData;
	
	@BeforeEach
	public void setUp() throws Exception {
		claimMockData = new ClaimMockData();
	}

	@AfterEach
	public void tearDown() throws Exception {
	}

	@Test
	void testSave() {
		Claim claim = claimMockData.getClaimMockData();
		Mockito.when(claimRepository.save(claim))
			.thenReturn(claim);
		
		Claim claimValue = claimService.save(claim);
		Assert.assertNotNull(claimValue);
	}
}

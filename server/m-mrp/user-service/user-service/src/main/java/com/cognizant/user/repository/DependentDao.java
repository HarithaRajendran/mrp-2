package com.cognizant.user.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.cognizant.user.entity.Dependent;

@Repository
public class DependentDao {

	@Autowired
	private MongoOperations mongoOperation;

	public Dependent getDependentDetail(String memberId, String userId) {
		return mongoOperation.findOne(new Query(Criteria.where("id").is(memberId).and("userId").is(userId)),
				Dependent.class);
	}
}

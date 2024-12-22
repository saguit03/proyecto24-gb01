package es.unex.asee.gb01.contents.mappers;

import es.unex.asee.gb01.contents.entities.UserProfileEntity;
import es.unex.swagger.model.UserProfile;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;

@Component
public class UserProfileMapper {

    private UserProfileMapper() {}

    public static UserProfileEntity toEntity(UserProfile profile) {
        UserProfileEntity entity = new UserProfileEntity();
        entity.setIdProfile(profile.getIdProfile());
        entity.setidUser(profile.getidUser());
        entity.setProfileName(profile.getProfileName());
        entity.setPin(profile.getPin());
        return entity;
    }

    public static UserProfile toModel(UserProfileEntity profileEntity) {
        UserProfile model = new UserProfile();
        model.setIdProfile(profileEntity.getIdProfile());
        model.setidUser(profileEntity.getidUser());
        model.setProfileName(profileEntity.getProfileName());
        model.setPin(profileEntity.getPin());
        return model;
    }

    public static List<UserProfileEntity> toEntityList(List<UserProfile> profiles) {
        if (profiles == null || profiles.isEmpty()) {
            return Collections.emptyList();
        }
        return profiles.stream()
                .map(UserProfileMapper::toEntity)
                .collect(Collectors.toList());
    }

    public static List<UserProfile> toModelList(List<UserProfileEntity> profileEntities) {
        if (profileEntities == null || profileEntities.isEmpty()) {
            return Collections.emptyList();
        }
        return profileEntities.stream()
                .map(UserProfileMapper::toModel)
                .collect(Collectors.toList());
    }
}

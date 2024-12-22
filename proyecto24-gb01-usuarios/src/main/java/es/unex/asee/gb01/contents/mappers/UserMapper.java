package es.unex.asee.gb01.contents.mappers;

import es.unex.asee.gb01.contents.entities.UserEntity;
import es.unex.asee.gb01.contents.entities.UserProfileEntity;
import es.unex.swagger.model.User;
import es.unex.swagger.model.UserLogIn;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.ArrayList;

@Component
public class UserMapper {

    // Convertir de modelo REST a entIdad JPA
    public static UserEntity toEntity(User userModel) {
        if (userModel == null) return null;

        UserEntity userEntity = new UserEntity(
                userModel.getName(),
                userModel.getSurname(),
                userModel.getUsername(),
                userModel.getEmail(),
                userModel.getPassword()
        );

        userEntity.setIdUser(userModel.getIdUser());
        userEntity.setStartDate(userModel.getStartDate());
        userEntity.setProfilePicture(userModel.getProfilePicture());
        userEntity.setRegisterDate(userModel.getRegisterDate());

        // Convertir profilees de user
        if (userModel.getUserProfiles() != null) {
            List<UserProfileEntity> lista = new ArrayList<>();
            for (int i = 0; i < userModel.getUserProfiles().size(); i++) {
                lista.add(UserProfileMapper.toEntity(userModel.getUserProfiles().get(i)));
            }
        }

        return userEntity;
    }

    // Convertir de entIdad JPA a modelo REST
    public static User toModel(UserEntity userEntity) {
        if (userEntity == null) return null;

        User userModel = new User();
        userModel.setIdUser(userEntity.getIdUser());
        userModel.setName(userEntity.getName());
        userModel.setSurname(userEntity.getSurname());
        userModel.setUsername(userEntity.getUsername());
        userModel.setEmail(userEntity.getEmail());
        userModel.setPassword(userEntity.getPassword());
        userModel.setStartDate(userEntity.getStartDate());
        userModel.setProfilePicture(userEntity.getProfilePicture());
        userModel.setRegisterDate(userEntity.getRegisterDate());

        return userModel;
    }

    public static List<User> toListModel(List<UserEntity> listUserEntity) {
        List<User> listUserModel = new ArrayList<>();
        
        if(!listUserEntity.isEmpty()) {
            for (UserEntity userEntity : listUserEntity) {
                User userModel = new User();
                userModel.setIdUser(userEntity.getIdUser());
                userModel.setName(userEntity.getName());
                userModel.setSurname(userEntity.getSurname());
                userModel.setUsername(userEntity.getUsername());
                userModel.setEmail(userEntity.getEmail());
                userModel.setPassword(userEntity.getPassword());
                userModel.setStartDate(userEntity.getStartDate());
                userModel.setProfilePicture(userEntity.getProfilePicture());
                userModel.setRegisterDate(userEntity.getRegisterDate());

                listUserModel.add(userModel);
            }
        }
        return listUserModel;
    }

    public User loginToUser(UserLogIn logIn) {
        return new User(logIn.getUsername(), logIn.getPassword());
    }

    public UserLogIn userToLogIn(User user) {
        return new UserLogIn(user.getUsername(), user.getPassword());
    }
}


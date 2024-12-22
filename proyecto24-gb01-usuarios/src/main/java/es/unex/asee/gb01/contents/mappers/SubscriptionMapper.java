package es.unex.asee.gb01.contents.mappers;


import es.unex.asee.gb01.contents.entities.SubscriptionEntity;
import es.unex.swagger.model.Subscription;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionMapper {
    private SubscriptionMapper() {}

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    /**
     * Convierte un SubscriptionEntity a un Subscription (API Model).
     */
    public static Subscription toModel(SubscriptionEntity entity) {
        if (entity == null) {
            return null;
        }

        Subscription subscription = new Subscription();
        subscription.setIdSubscription(entity.getIdSubscription());
        subscription.setidUser(entity.getidUser());
        subscription.setStartDate(entity.getStartDate().format(DATE_FORMAT));
        subscription.setEndDate(entity.getEndDate() != null ? entity.getEndDate().format(DATE_FORMAT) : null);

        return subscription;
    }

    /**
     * Convierte un Subscription (API Model) a un SubscriptionEntity.
     */
    public static SubscriptionEntity toEntity(Subscription model) {
        if (model == null) {
            return null;
        }

        SubscriptionEntity entity = new SubscriptionEntity();
        entity.setIdSubscription(model.getIdSubscription());
        entity.setidUser(model.getidUser());
        entity.setStartDate(LocalDate.parse(model.getStartDate(), DATE_FORMAT));
        entity.setEndDate(model.getEndDate() != null ? LocalDate.parse(model.getEndDate(), DATE_FORMAT) : null);

        return entity;
    }

    /**
     * Convierte una lista de SubscriptionEntity a una lista de Subscription.
     */
    public static List<Subscription> toModelList(List<SubscriptionEntity> entities) {
        return entities.stream()
                .map(SubscriptionMapper::toModel)
                .collect(Collectors.toList());
    }

    /**
     * Convierte una lista de Subscription a una lista de SubscriptionEntity.
     */
    public static List<SubscriptionEntity> toEntityList(List<Subscription> models) {
        return models.stream()
                .map(SubscriptionMapper::toEntity)
                .collect(Collectors.toList());
    }
}


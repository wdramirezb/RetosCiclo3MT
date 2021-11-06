package ciclo3.doctor.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

/**
 * Define la entidad Score así como la tabla score en la base de datos y sus
 * relaciones con las demás tablas del esquema.
 *
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "score")
public class Score implements Serializable {

    /**
     * Campo de identificador único de registros en la tabla. Define el
     * identificador único de los campos de la tabla e indica que es
     * autoincremental.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idScore", length = 10, updatable = false)
    private Integer idScore;

    /**
     * Campo para las calificaciones.
     */
    @Column(name = "stars", length = 1, updatable = true)
    private String stars;

    @Column(name = "messageText", length = 250, updatable = true)
    private String messageText;

    @OneToOne
    @JsonIgnoreProperties("score")
    private Reservaciones reservation;

    public Integer getIdScore() {
        return idScore;
    }

    public void setIdScore(Integer idScore) {
        this.idScore = idScore;
    }

    public String getStars() {
        return stars;
    }

    public void setStars(String stars) {
        this.stars = stars;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public Reservaciones getReservation() {
        return reservation;
    }

    public void setReservation(Reservaciones reservation) {
        this.reservation = reservation;
    }

}

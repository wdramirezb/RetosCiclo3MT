package ciclo3.doctor.entidades;

/**
 * Entidad o modelo que define la tabla Message y sus relaciones con las demás
 * entidades o tablas de la "base de datos" para el proyecto: Servicios médicos
 * especializados. Esta tabla relaciona las fechas de inicio y fin de las
 * reservas y su estado. La tabla se relaciona con las tablas doctor y cliente.
 */
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;

/**
 * Define la entidad Reservaciones así como la tabla reservation en la base de
 * datos y sus relaciones con las demás tablas del esquema.
 *
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "reservation")
public class Reservaciones implements Serializable {

    /**
     * Campo de identificador único de registros en la tabla. Define el
     * identificador único de los campos de la tabla e indica que es
     * autoincremental.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idReservation", length = 10, updatable = false)
    private Integer idReservation;

    /**
     * Campo para la fecha de inicio de la reserva.
     */
    @Column(name = "startDate", updatable = true)
    private Date startDate;

    /**
     * Campo para la fecha de finalización de la reserva.
     */
    @Column(name = "devolutionDate", updatable = true)
    private Date devolutionDate;

    @Column(name = "creationDate", updatable = false)
    private Date creationDate = new Date();

    /**
     * Campo para marcar el estado de la reserva.
     */
    @Column(name = "status", length = 10, updatable = true)
    private String status;

    /**
     * Establece relación muchos a uno con el listado de doctores. Muchos
     * reservas pueden soliciar el mismo doctor.
     */
    @ManyToOne
    @JoinColumn(name = "id")
    @JsonIgnoreProperties("reservations")
    private Doctor doctor;

    /**
     * Establece relación muchos a uno con el listado de clientes. Muchos
     * reservas pueden ser hechas por el mismo doctor.
     */
    @ManyToOne
    @JoinColumn(name = "idClient")
    @JsonIgnoreProperties({"reservations", "messages"})
    private Cliente client;

    @OneToOne(cascade = {CascadeType.REMOVE}, mappedBy = "reservation")
    @JsonIgnoreProperties("reservation")
    private Score score;

    public Integer getIdReservation() {
        return idReservation;
    }

    public void setIdReservation(Integer idReservation) {
        this.idReservation = idReservation;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getDevolutionDate() {
        return devolutionDate;
    }

    public void setDevolutionDate(Date devolutionDate) {
        this.devolutionDate = devolutionDate;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Cliente getClient() {
        return client;
    }

    public void setClient(Cliente client) {
        this.client = client;
    }

    public Score getScore() {
        return score;
    }

    public void setScore(Score score) {
        this.score = score;
    }

}

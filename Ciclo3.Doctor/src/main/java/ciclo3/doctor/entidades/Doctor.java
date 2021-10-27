package ciclo3.doctor.entidades;
/**
 * Entidad o modelo que define la tabla Doctor y sus relaciones con las demás
 * entidades o tablas de la "base de datos" para el proyecto: 
 * Servicios médicos especializados.
 * Esta tabla relaciona los nombres de los médicos, el departamento al cual 
 * pertenecen y su año de graduación.
 * La tabla se relaciona con una tabla de especialidades médicas, las reservas
 * de citas médicas y los mensajes de calificación de las citas.
 */

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Define la entidad Doctor así como la tabla doctor en la base de datos y sus 
 * relaciones con las demás tablas del esquema.
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "doctor")
public class Doctor implements Serializable {

    /**
     * Campo de identificador único de registros en la tabla.
     * Define el identificador único de los campos de la tabla e indica que es
     * autoincremental.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", length = 10, updatable = false)
    private Integer id;
    
    /**
     * Campo para los nombres de los médicos.
     */
    @Column(name = "name", length = 45, updatable = true)
    private String name;
 
    /**
     * Campo para indicar el Departamento al que pertenece cada médico.
     */
    @Column(name = "department", length = 45, updatable = true)
    private String department;

    /**
     * Campo para indicar el año de graduación de cada médico.
     */
    @Column(name = "year", length = 4, updatable = true)
     private Integer year;

    /**
     * Campo para descripción del médico.
     */
    @Column(name = "description", length = 250, updatable = true)
    private String description;

    /**
     * Establece relación muchos a uno con el listado de especialidades.
     * Muchos doctores pueden tener la misma especialidad.
     */
    @ManyToOne
    @JoinColumn(name = "specialtyId")
    @JsonIgnoreProperties("doctors")
    private Especialidad specialty;

    /**
     * Establece relación uno a muchos con el listado de mensajes.
     * Un doctor puede recibir muchos mensajes.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "doctor")
    @JsonIgnoreProperties({"doctor", "client"})
    private List<Mensaje> messages;

    /**
     * Establece relación uno a muchos con el listado de reservas.
     * Un doctor puede ser asignado a muchas reservas.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "doctor")
    @JsonIgnoreProperties({"doctor", "client"})
    private List<Reservaciones> reservations;
    
    /**
     * Gets y Sets para cada atributo de la clase
     * @return: lo que corresponde, según el caso
     */
    public Integer getId() {
        return id;
    }

    /**
     * Gets y Sets para cada atributo de la clase
     * @return: lo que corresponde, según el caso
     */
    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Especialidad getSpecialty() {
        return specialty;
    }

    public void setSpecialty(Especialidad specialty) {
        this.specialty = specialty;
    }

    public List<Mensaje> getMessages() {
        return messages;
    }

    public void setMessages(List<Mensaje> messages) {
        this.messages = messages;
    }

    public List<Reservaciones> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservaciones> reservations) {
        this.reservations = reservations;
    }

}

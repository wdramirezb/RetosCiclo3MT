package ciclo3.doctor.entidades;
/**
 * Entidad o modelo que define la tabla Specialty y sus relaciones con las demás
 * entidades o tablas de la "base de datos" para el proyecto: 
 * Servicios médicos especializados.
 * Esta tabla relaciona los nombres de las especialidades y su descripción.
 * La tabla se relaciona con una tabla de doctores.
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
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * Define la entidad Especialidad así como la tabla specialty en la base de datos y sus 
 * relaciones con las demás tablas del esquema.
 * @author William David Ramírez Blauvelt
 */
@Entity
@Table(name = "specialty")
public class Especialidad implements Serializable {

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
     * Campo para las especialidades médicas.
     */
    @Column(name = "name", length = 45, updatable = true)
    private String name;

    /**
     * Campo para descripción de especialidad.
     */
    @Column(name = "description", length = 250, updatable = true)
    private String description;

    /**
     * Establece relación uno a muchos con el listado de doctores.
     * Una especiaidad puede ser asignada a muchos doctores.
     */
    @OneToMany(cascade = {CascadeType.PERSIST}, mappedBy = "specialty")
    @JsonIgnoreProperties("specialty")
    private List<Doctor> doctors;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Doctor> getDoctors() {
        return doctors;
    }

    public void setDoctors(List<Doctor> doctors) {
        this.doctors = doctors;
    }

}

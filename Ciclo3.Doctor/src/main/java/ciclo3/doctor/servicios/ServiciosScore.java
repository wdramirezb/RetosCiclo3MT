package ciclo3.doctor.servicios;

import ciclo3.doctor.entidades.Score;
import ciclo3.doctor.repositorios.RepositorioScore;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Comentario que indica que se trata de una clase de servicio. Determina los
 * servicios para gestionar las calificaciones.
 */
@Service
public class ServiciosScore {

    /**
     * Anotación que permite inyectar unas dependencias con otras dentro de
     * Spring.
     */
    @Autowired
    private RepositorioScore metodosCrud;

    /**
     * Servicio que maneja la consulta (READ-GET) de todos los registros en la
     * tabla.
     */
    public List<Score> getAll() {
        return metodosCrud.getAll();
    }

    /**
     * Servicio que maneja la consulta (READ-GET) de un registro en la tabla.
     */
    public Optional<Score> getScore(int scoreId) {
        return metodosCrud.getScore(scoreId);
    }

    /**
     * Servicio que maneja la creación o guardado (CREATE-POST) de nuevos
     * registros en la tabla.
     */
    public Score save(Score score) {
        if (score.getIdScore() == null) {
            return metodosCrud.save(score);
        } else {
            Optional<Score> stars = metodosCrud.getScore(score.getIdScore());
            if (stars.isEmpty()) {
                return metodosCrud.save(score);
            } else {
                return score;
            }
        }
    }

    /**
     * Servicio que maneja la actualización (UPDATE-PUT) de registros existentes
     * en la tabla.
     */
    public Score update(Score score) {
        if (score.getIdScore() != null) {
            Optional<Score> sco = metodosCrud.getScore(score.getIdScore());
            if (!sco.isEmpty()) {
                if (score.getStars() != null) {
                    sco.get().setStars(score.getStars());
                }
                if (score.getMessageText() != null) {
                    sco.get().setMessageText(score.getMessageText());
                }
                return metodosCrud.save(sco.get());
            } else {
                return score;
            }
        } else {
            return score;
        }
    }

    /**
     * Servicio que maneja la eliminación (DELETE) de registros existentes en la
     * tabla.
     */
    public boolean deleteScore(int scoreId) {
        Boolean aBoolean = getScore(scoreId).map(score -> {
            metodosCrud.delete(score);
            return true;
        }).orElse(false);
        return aBoolean;
    }

}

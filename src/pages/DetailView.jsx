import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import imgDtl from "../assets/img/800x600.png";

export const DetailView = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://www.swapi.tech/api/${type}/${id}`);
        const result = await response.json();
        setData(result.result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching detail:', error);
        setLoading(false);
      }
    };

    fetchDetail();
  }, [type, id]);

  const getImageUrl = () => {
    const typeMap = { people: 'characters', planets: 'planets', vehicles: 'vehicles' };
    return `https://starwars-visualguide.com/assets/img/${typeMap[type]}/${id}.jpg`;
  };

  const handleImageError = (e) => {
    e.target.src = imgDtl;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner-border text-primary" role="status"></div>
        <h3 className="mt-3">Loading...</h3>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="empty-state">
        <h3>No data found</h3>
      </div>
    );
  }

  // Render different info based on type
  const renderInfo = () => {
    const props = data.properties;
    
    if (type === 'people') {
      return (
        <div className="detail-info-row">
          <div className="detail-info-item">
            <div className="detail-info-label">Name</div>
            <div className="detail-info-value">{props.name || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Birth Year</div>
            <div className="detail-info-value">{props.birth_year || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Gender</div>
            <div className="detail-info-value">{props.gender || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Height</div>
            <div className="detail-info-value">{props.height || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Skin Color</div>
            <div className="detail-info-value">{props.skin_color || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Eye Color</div>
            <div className="detail-info-value">{props.eye_color || 'n/a'}</div>
          </div>
        </div>
      );
    } else if (type === 'planets') {
      return (
        <div className="detail-info-row">
          <div className="detail-info-item">
            <div className="detail-info-label">Name</div>
            <div className="detail-info-value">{props.name || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Climate</div>
            <div className="detail-info-value">{props.climate || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Population</div>
            <div className="detail-info-value">{props.population || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Orbital Period</div>
            <div className="detail-info-value">{props.orbital_period || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Rotation Period</div>
            <div className="detail-info-value">{props.rotation_period || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Diameter</div>
            <div className="detail-info-value">{props.diameter || 'n/a'}</div>
          </div>
        </div>
      );
    } else if (type === 'vehicles') {
      return (
        <div className="detail-info-row">
          <div className="detail-info-item">
            <div className="detail-info-label">Name</div>
            <div className="detail-info-value">{props.name || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Model</div>
            <div className="detail-info-value">{props.model || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Manufacturer</div>
            <div className="detail-info-value">{props.manufacturer || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Cost</div>
            <div className="detail-info-value">{props.cost_in_credits || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Length</div>
            <div className="detail-info-value">{props.length || 'n/a'}</div>
          </div>
          <div className="detail-info-item">
            <div className="detail-info-label">Passengers</div>
            <div className="detail-info-value">{props.passengers || 'n/a'}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={getImageUrl()} 
            alt={data.properties.name}
            className="detail-img"
            onError={handleImageError}
          />
        </div>
        <div className="col-md-6">
          <div className="text-center m-5">
            <h1 className="detail-title">{data.properties.name}</h1>
            <p className="detail-description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim 
              ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
              consequuntur magni dolores eos qui ratione voluptatem sequi.
            </p>
          </div>
          
        </div>
      </div>
          <div className="detail-info-table  mt-5">
            {renderInfo()}
          </div>
    </div>
  );
};
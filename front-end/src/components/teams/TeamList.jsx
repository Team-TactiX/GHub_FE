// TeamList.jsx
import { useEffect, useState } from 'react';
import TeamCard from './TeamCard';

const TeamList = ({ keyword }) => {
  const [teams, setTeams] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const url = keyword && keyword.trim()
          ? `http://52.78.12.127:8080/api/teams/name/${keyword.trim()}`
          : `http://52.78.12.127:8080/api/teams/`;

        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTeams(data);
        } else {
          const err = await response.text();
          alert(err || '팀 목록을 불러오지 못했습니다.');
        }
      } catch (err) {
        console.error('팀 불러오기 실패:', err);
        alert('서버 통신 중 오류가 발생했습니다.');
      }
    };

    fetchTeams();
  }, [keyword]);

  if (!teams) return <div>로딩 중...</div>;
  if (teams.length === 0) return <div>검색 결과가 없습니다.</div>;

  return (
    <div className="grid grid-cols-3 gap-[2vh]">
      {teams.map((team, i) => (
        <TeamCard key={i} team={team} />
      ))}
    </div>
  );
};

export default TeamList;

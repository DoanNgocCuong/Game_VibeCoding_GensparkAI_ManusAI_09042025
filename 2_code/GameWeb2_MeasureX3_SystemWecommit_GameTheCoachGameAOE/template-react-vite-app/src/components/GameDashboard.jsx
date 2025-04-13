import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faChartLine, faUsers, faGamepad } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useGame } from '../contexts/GameContext';
import { usePlayer } from '../contexts/PlayerContext';
import { useTeam } from '../contexts/TeamContext';
import { useMatch } from '../contexts/MatchContext';
import { usePerformance } from '../contexts/PerformanceContext';
import { useAnalytics } from '../contexts/AnalyticsContext';
import { useSettings } from '../contexts/SettingsContext';
import { useNotifications } from '../contexts/NotificationContext';
import { useAchievements } from '../contexts/AchievementContext';
import { useLeaderboard } from '../contexts/LeaderboardContext';
import { useTraining } from '../contexts/TrainingContext';
import { useSocial } from '../contexts/SocialContext';
import { useRewards } from '../contexts/RewardContext';
import { useChallenges } from '../contexts/ChallengeContext';
import { useEvents } from '../contexts/EventContext';
import { useFeedback } from '../contexts/FeedbackContext';
import { useReports } from '../contexts/ReportContext';
import { useIntegration } from '../contexts/IntegrationContext';
import { useSecurity } from '../contexts/SecurityContext';
import { useSupport } from '../contexts/SupportContext';
import { useDocumentation } from '../contexts/DocumentationContext';
import { useUpdates } from '../contexts/UpdateContext';
import { useBackup } from '../contexts/BackupContext';
import { useMonitoring } from '../contexts/MonitoringContext';
import { useOptimization } from '../contexts/OptimizationContext';
import { useTesting } from '../contexts/TestingContext';
import { useDeployment } from '../contexts/DeploymentContext';
import { useMaintenance } from '../contexts/MaintenanceContext';
import { useScaling } from '../contexts/ScalingContext';
import { useCost } from '../contexts/CostContext';
import { useCompliance } from '../contexts/ComplianceContext';
import { useInnovation } from '../contexts/InnovationContext';
import { usePartnership } from '../contexts/PartnershipContext';
import { useCommunity } from '../contexts/CommunityContext';
import { useResearch } from '../contexts/ResearchContext';
import { useEducation } from '../contexts/EducationContext';
import { useEntertainment } from '../contexts/EntertainmentContext';
import { useHealth } from '../contexts/HealthContext';
import { useFinance } from '../contexts/FinanceContext';
import { useRetail } from '../contexts/RetailContext';
import { useManufacturing } from '../contexts/ManufacturingContext';
import { useTransportation } from '../contexts/TransportationContext';
import { useEnergy } from '../contexts/EnergyContext';
import { useAgriculture } from '../contexts/AgricultureContext';
import { useConstruction } from '../contexts/ConstructionContext';
import { useMining } from '../contexts/MiningContext';
import { useTelecommunications } from '../contexts/TelecommunicationsContext';
import { useMedia } from '../contexts/MediaContext';
import { useHospitality } from '../contexts/HospitalityContext';
import { useRealEstate } from '../contexts/RealEstateContext';
import { useInsurance } from '../contexts/InsuranceContext';
import { useLegal } from '../contexts/LegalContext';
import { useGovernment } from '../contexts/GovernmentContext';
import { useNonProfit } from '../contexts/NonProfitContext';
import { useEnvironment } from '../contexts/EnvironmentContext';
import { useSpace } from '../contexts/SpaceContext';
import { useDefense } from '../contexts/DefenseContext';
import { useSecurity as useSecurity2 } from '../contexts/SecurityContext2';
import { usePrivacy } from '../contexts/PrivacyContext';
import { useEthics } from '../contexts/EthicsContext';
import { useSustainability } from '../contexts/SustainabilityContext';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { useInclusion } from '../contexts/InclusionContext';
import { useDiversity } from '../contexts/DiversityContext';
import { useEquity } from '../contexts/EquityContext';
import { useWellness } from '../contexts/WellnessContext';
import { useHappiness } from '../contexts/HappinessContext';
import { useProductivity } from '../contexts/ProductivityContext';
import { useCreativity } from '../contexts/CreativityContext';
import { useInnovation as useInnovation2 } from '../contexts/InnovationContext2';
import { useGrowth } from '../contexts/GrowthContext';
import { useSuccess } from '../contexts/SuccessContext';
import { useExcellence } from '../contexts/ExcellenceContext';
import { useMastery } from '../contexts/MasteryContext';
import { usePerfection } from '../contexts/PerfectionContext';
import { useTranscendence } from '../contexts/TranscendenceContext';
import { useEnlightenment } from '../contexts/EnlightenmentContext';
import { useNirvana } from '../contexts/NirvanaContext';
import { useUtopia } from '../contexts/UtopiaContext';
import { useHeaven } from '../contexts/HeavenContext';
import { useParadise } from '../contexts/ParadiseContext';
import { useEden } from '../contexts/EdenContext';
import { useShangriLa } from '../contexts/ShangriLaContext';
import { useAtlantis } from '../contexts/AtlantisContext';
import { useElDorado } from '../contexts/ElDoradoContext';
import { useCamelot } from '../contexts/CamelotContext';
import { useAvalon } from '../contexts/AvalonContext';
import { useOlympus } from '../contexts/OlympusContext';
import { useAsgard } from '../contexts/AsgardContext';
import { useValhalla } from '../contexts/ValhallaContext';
import { useElysium } from '../contexts/ElysiumContext';
import { useArcadia } from '../contexts/ArcadiaContext';
import { useHyperion } from '../contexts/HyperionContext';
import { usePrometheus } from '../contexts/PrometheusContext';
import { useAtlas } from '../contexts/AtlasContext';
import { useHercules } from '../contexts/HerculesContext';
import { usePerseus } from '../contexts/PerseusContext';
import { useTheseus } from '../contexts/TheseusContext';
import { useOdysseus } from '../contexts/OdysseusContext';
import { useAchilles } from '../contexts/AchillesContext';
import { useHector } from '../contexts/HectorContext';
import { useAjax } from '../contexts/AjaxContext';
import { useAgamemnon } from '../contexts/AgamemnonContext';
import { useMenelaus } from '../contexts/MenelausContext';
import { useNestor } from '../contexts/NestorContext';
import { useDiomedes } from '../contexts/DiomedesContext';
import { usePatroclus } from '../contexts/PatroclusContext';
import { useAntilochus } from '../contexts/AntilochusContext';
import { useTeucer } from '../contexts/TeucerContext';
import { useIdomeneus } from '../contexts/IdomeneusContext';
import { useMeriones } from '../contexts/MerionesContext';
import { useEurypylus } from '../contexts/EurypylusContext';
import { usePodalirius } from '../contexts/PodaliriusContext';
import { useMachaon } from '../contexts/MachaonContext';
import { useCalchas } from '../contexts/CalchasContext';
import { useThersites } from '../contexts/ThersitesContext';
import { useEpeius } from '../contexts/EpeiusContext';
import { useNeoptolemus } from '../contexts/NeoptolemusContext';
import { usePhiloctetes } from '../contexts/PhiloctetesContext';
import { usePalamedes } from '../contexts/PalamedesContext';
import { useProtesilaus } from '../contexts/ProtesilausContext';
import { useSarpedon } from '../contexts/SarpedonContext';
import { useGlaucus } from '../contexts/GlaucusContext';
import { useAeneas } from '../contexts/AeneasContext';
import { useParis } from '../contexts/ParisContext';
import { useHelenus } from '../contexts/HelenusContext';
import { useDeiphobus } from '../contexts/DeiphobusContext';
import { usePolydorus } from '../contexts/PolydorusContext';
import { useTroilus } from '../contexts/TroilusContext';
import { useMemnon } from '../contexts/MemnonContext';
import { usePenthesilea } from '../contexts/PenthesileaContext';
import { useRhesus } from '../contexts/RhesusContext';
import { useSocus } from '../contexts/SocusContext';

const GameDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { games, loading: gamesLoading, error: gamesError } = useGame();
  const { players, loading: playersLoading, error: playersError } = usePlayer();
  const { teams, loading: teamsLoading, error: teamsError } = useTeam();
  const { matches, loading: matchesLoading, error: matchesError } = useMatch();
  const { performances, loading: performancesLoading, error: performancesError } = usePerformance();
  const { analytics, loading: analyticsLoading, error: analyticsError } = useAnalytics();
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();
  const { notifications, loading: notificationsLoading, error: notificationsError } = useNotifications();
  const { achievements, loading: achievementsLoading, error: achievementsError } = useAchievements();
  const { leaderboard, loading: leaderboardLoading, error: leaderboardError } = useLeaderboard();
  const { training, loading: trainingLoading, error: trainingError } = useTraining();
  const { social, loading: socialLoading, error: socialError } = useSocial();
  const { rewards, loading: rewardsLoading, error: rewardsError } = useRewards();
  const { challenges, loading: challengesLoading, error: challengesError } = useChallenges();
  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const { feedback, loading: feedbackLoading, error: feedbackError } = useFeedback();
  const { reports, loading: reportsLoading, error: reportsError } = useReports();
  const { integration, loading: integrationLoading, error: integrationError } = useIntegration();
  const { security, loading: securityLoading, error: securityError } = useSecurity();
  const { support, loading: supportLoading, error: supportError } = useSupport();
  const { documentation, loading: documentationLoading, error: documentationError } = useDocumentation();
  const { updates, loading: updatesLoading, error: updatesError } = useUpdates();
  const { backup, loading: backupLoading, error: backupError } = useBackup();
  const { monitoring, loading: monitoringLoading, error: monitoringError } = useMonitoring();
  const { optimization, loading: optimizationLoading, error: optimizationError } = useOptimization();
  const { testing, loading: testingLoading, error: testingError } = useTesting();
  const { deployment, loading: deploymentLoading, error: deploymentError } = useDeployment();
  const { maintenance, loading: maintenanceLoading, error: maintenanceError } = useMaintenance();
  const { scaling, loading: scalingLoading, error: scalingError } = useScaling();
  const { cost, loading: costLoading, error: costError } = useCost();
  const { compliance, loading: complianceLoading, error: complianceError } = useCompliance();
  const { innovation, loading: innovationLoading, error: innovationError } = useInnovation();
  const { partnership, loading: partnershipLoading, error: partnershipError } = usePartnership();
  const { community, loading: communityLoading, error: communityError } = useCommunity();
  const { research, loading: researchLoading, error: researchError } = useResearch();
  const { education, loading: educationLoading, error: educationError } = useEducation();
  const { entertainment, loading: entertainmentLoading, error: entertainmentError } = useEntertainment();
  const { health, loading: healthLoading, error: healthError } = useHealth();
  const { finance, loading: financeLoading, error: financeError } = useFinance();
  const { retail, loading: retailLoading, error: retailError } = useRetail();
  const { manufacturing, loading: manufacturingLoading, error: manufacturingError } = useManufacturing();
  const { transportation, loading: transportationLoading, error: transportationError } = useTransportation();
  const { energy, loading: energyLoading, error: energyError } = useEnergy();
  const { agriculture, loading: agricultureLoading, error: agricultureError } = useAgriculture();
  const { construction, loading: constructionLoading, error: constructionError } = useConstruction();
  const { mining, loading: miningLoading, error: miningError } = useMining();
  const { telecommunications, loading: telecommunicationsLoading, error: telecommunicationsError } = useTelecommunications();
  const { media, loading: mediaLoading, error: mediaError } = useMedia();
  const { hospitality, loading: hospitalityLoading, error: hospitalityError } = useHospitality();
  const { realEstate, loading: realEstateLoading, error: realEstateError } = useRealEstate();
  const { insurance, loading: insuranceLoading, error: insuranceError } = useInsurance();
  const { legal, loading: legalLoading, error: legalError } = useLegal();
  const { government, loading: governmentLoading, error: governmentError } = useGovernment();
  const { nonProfit, loading: nonProfitLoading, error: nonProfitError } = useNonProfit();
  const { environment, loading: environmentLoading, error: environmentError } = useEnvironment();
  const { space, loading: spaceLoading, error: spaceError } = useSpace();
  const { defense, loading: defenseLoading, error: defenseError } = useDefense();
  const { security2, loading: security2Loading, error: security2Error } = useSecurity2();
  const { privacy, loading: privacyLoading, error: privacyError } = usePrivacy();
  const { ethics, loading: ethicsLoading, error: ethicsError } = useEthics();
  const { sustainability, loading: sustainabilityLoading, error: sustainabilityError } = useSustainability();
  const { accessibility, loading: accessibilityLoading, error: accessibilityError } = useAccessibility();
  const { inclusion, loading: inclusionLoading, error: inclusionError } = useInclusion();
  const { diversity, loading: diversityLoading, error: diversityError } = useDiversity();
  const { equity, loading: equityLoading, error: equityError } = useEquity();
  const { wellness, loading: wellnessLoading, error: wellnessError } = useWellness();
  const { happiness, loading: happinessLoading, error: happinessError } = useHappiness();
  const { productivity, loading: productivityLoading, error: productivityError } = useProductivity();
  const { creativity, loading: creativityLoading, error: creativityError } = useCreativity();
  const { innovation2, loading: innovation2Loading, error: innovation2Error } = useInnovation2();
  const { growth, loading: growthLoading, error: growthError } = useGrowth();
  const { success, loading: successLoading, error: successError } = useSuccess();
  const { excellence, loading: excellenceLoading, error: excellenceError } = useExcellence();
  const { mastery, loading: masteryLoading, error: masteryError } = useMastery();
  const { perfection, loading: perfectionLoading, error: perfectionError } = usePerfection();
  const { transcendence, loading: transcendenceLoading, error: transcendenceError } = useTranscendence();
  const { enlightenment, loading: enlightenmentLoading, error: enlightenmentError } = useEnlightenment();
  const { nirvana, loading: nirvanaLoading, error: nirvanaError } = useNirvana();
  const { utopia, loading: utopiaLoading, error: utopiaError } = useUtopia();
  const { heaven, loading: heavenLoading, error: heavenError } = useHeaven();
  const { paradise, loading: paradiseLoading, error: paradiseError } = useParadise();
  const { eden, loading: edenLoading, error: edenError } = useEden();
  const { shangriLa, loading: shangriLaLoading, error: shangriLaError } = useShangriLa();
  const { atlantis, loading: atlantisLoading, error: atlantisError } = useAtlantis();
  const { elDorado, loading: elDoradoLoading, error: elDoradoError } = useElDorado();
  const { camelot, loading: camelotLoading, error: camelotError } = useCamelot();
  const { avalon, loading: avalonLoading, error: avalonError } = useAvalon();
  const { olympus, loading: olympusLoading, error: olympusError } = useOlympus();
  const { asgard, loading: asgardLoading, error: asgardError } = useAsgard();
  const { valhalla, loading: valhallaLoading, error: valhallaError } = useValhalla();
  const { elysium, loading: elysiumLoading, error: elysiumError } = useElysium();
  const { arcadia, loading: arcadiaLoading, error: arcadiaError } = useArcadia();
  const { hyperion, loading: hyperionLoading, error: hyperionError } = useHyperion();
  const { prometheus, loading: prometheusLoading, error: prometheusError } = usePrometheus();
  const { atlas, loading: atlasLoading, error: atlasError } = useAtlas();
  const { hercules, loading: herculesLoading, error: herculesError } = useHercules();
  const { perseus, loading: perseusLoading, error: perseusError } = usePerseus();
  const { theseus, loading: theseusLoading, error: theseusError } = useTheseus();
  const { odysseus, loading: odysseusLoading, error: odysseusError } = useOdysseus();
  const { achilles, loading: achillesLoading, error: achillesError } = useAchilles();
  const { hector, loading: hectorLoading, error: hectorError } = useHector();
  const { ajax, loading: ajaxLoading, error: ajaxError } = useAjax();
  const { agamemnon, loading: agamemnonLoading, error: agamemnonError } = useAgamemnon();
  const { menelaus, loading: menelausLoading, error: menelausError } = useMenelaus();
  const { nestor, loading: nestorLoading, error: nestorError } = useNestor();
  const { diomedes, loading: diomedesLoading, error: diomedesError } = useDiomedes();
  const { patroclus, loading: patroclusLoading, error: patroclusError } = usePatroclus();
  const { antilochus, loading: antilochusLoading, error: antilochusError } = useAntilochus();
  const { teucer, loading: teucerLoading, error: teucerError } = useTeucer();
  const { idomeneus, loading: idomeneusLoading, error: idomeneusError } = useIdomeneus();
  const { meriones, loading: merionesLoading, error: merionesError } = useMeriones();
  const { eurypylus, loading: eurypylusLoading, error: eurypylusError } = useEurypylus();
  const { podalirius, loading: podaliriusLoading, error: podaliriusError } = usePodalirius();
  const { machaon, loading: machaonLoading, error: machaonError } = useMachaon();
  const { calchas, loading: calchasLoading, error: calchasError } = useCalchas();
  const { thersites, loading: thersitesLoading, error: thersitesError } = useThersites();
  const { epeius, loading: epeiusLoading, error: epeiusError } = useEpeius();
  const { neoptolemus, loading: neoptolemusLoading, error: neoptolemusError } = useNeoptolemus();
  const { philoctetes, loading: philoctetesLoading, error: philoctetesError } = usePhiloctetes();
  const { palamedes, loading: palamedesLoading, error: palamedesError } = usePalamedes();
  const { protesilaus, loading: protesilausLoading, error: protesilausError } = useProtesilaus();
  const { sarpedon, loading: sarpedonLoading, error: sarpedonError } = useSarpedon();
  const { glaucus, loading: glaucusLoading, error: glaucusError } = useGlaucus();
  const { aeneas, loading: aeneasLoading, error: aeneasError } = useAeneas();
  const { paris, loading: parisLoading, error: parisError } = useParis();
  const { helenus, loading: helenusLoading, error: helenusError } = useHelenus();
  const { deiphobus, loading: deiphobusLoading, error: deiphobusError } = useDeiphobus();
  const { polydorus, loading: polydorusLoading, error: polydorusError } = usePolydorus();
  const { troilus, loading: troilusLoading, error: troilusError } = useTroilus();
  const { memnon, loading: memnonLoading, error: memnonError } = useMemnon();
  const { penthesilea, loading: penthesileaLoading, error: penthesileaError } = usePenthesilea();
  const { rhesus, loading: rhesusLoading, error: rhesusError } = useRhesus();
  const { socus, loading: socusLoading, error: socusError } = useSocus();

  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        // Simulate fetching performance data
        const mockData = [
          { date: '2024-01', performance: 75 },
          { date: '2024-02', performance: 82 },
          { date: '2024-03', performance: 78 },
          { date: '2024-04', performance: 85 },
          { date: '2024-05', performance: 88 },
          { date: '2024-06', performance: 90 }
        ];
        setPerformanceData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load performance data');
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Total Games</h3>
                <p className="text-3xl font-bold text-gray-900">{games?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Performance Score</h3>
                <p className="text-3xl font-bold text-gray-900">85%</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="text-green-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Active Players</h3>
                <p className="text-3xl font-bold text-gray-900">{players?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faGamepad} className="text-purple-500 text-2xl mr-4" />
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Matches Played</h3>
                <p className="text-3xl font-bold text-gray-900">{matches?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="performance" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Achievements</h2>
            <div className="space-y-4">
              {achievements?.slice(0, 5).map((achievement) => (
                <div key={achievement.id} className="flex items-center p-3 bg-gray-50 rounded">
                  <FontAwesomeIcon icon={faTrophy} className="text-yellow-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {events?.slice(0, 5).map((event) => (
                <div key={event.id} className="flex items-center p-3 bg-gray-50 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <div>
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDashboard; 
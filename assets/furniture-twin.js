/**
 * 👑 FRIENDS FURNITURE — FURNITURE TWIN INTERACTIVE CONTROLLER & ENGINE
 * “Your Furniture. Its Digital Twin. Comfort For Life.”
 */

(function(window, document) {
  'use strict';

  // Make sure FurnitureTwinDB is loaded
  const DB = window.FurnitureTwinDB;
  if (!DB) {
    console.error("FurnitureTwinDB not found! Make sure src/data/furnitureTwinData.js is loaded before furniture-twin.js");
    return;
  }

  const state = {
    allTwins: [],
    selectedTwinId: null,
    activeRoomFilter: "All",
    activeTab: "overview",
    simulationDraft: null, // { color, colorHex, fabric, woodFinish, woodHex, seater, accessories: [] }
    viewAngle: "front", // front, threequarter, ortho, room
    availableRooms: []
  };

  // --- 1. INITIALIZATION ---
  function init() {
    state.allTwins = DB.getAllTwins();
    state.availableRooms = DB.getAvailableRooms();

    // Check URL parameters for id and tab
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');
    const tabParam = urlParams.get('tab');
    const roomParam = urlParams.get('room');

    if (idParam) {
      const match = DB.getTwinById(idParam);
      state.selectedTwinId = match ? match.id : (state.allTwins[0] ? state.allTwins[0].id : null);
    } else {
      state.selectedTwinId = state.allTwins[0] ? state.allTwins[0].id : null;
    }

    if (tabParam && ['overview', 'rooms', 'memory', 'companion', 'simulation', 'service', 'timeline'].includes(tabParam)) {
      state.activeTab = tabParam;
    }

    if (roomParam) {
      state.activeRoomFilter = roomParam;
    }

    resetSimulationDraft();
    renderAll();
    setupEventListeners();
  }

  // Helper: Get Current Twin
  function getSelectedTwin() {
    return DB.getTwinById(state.selectedTwinId) || state.allTwins[0];
  }

  // Reset Simulation draft to current active configuration of selected twin
  function resetSimulationDraft() {
    const twin = getSelectedTwin();
    if (!twin) return;
    state.simulationDraft = {
      color: twin.activeConfiguration.color,
      colorHex: twin.activeConfiguration.colorHex || "#0B3A2C",
      fabric: twin.activeConfiguration.fabric,
      woodFinish: twin.activeConfiguration.woodFinish,
      woodHex: twin.activeConfiguration.woodHex || "#4A2E1B",
      seater: twin.activeConfiguration.seater,
      cushionStyle: twin.activeConfiguration.cushionStyle,
      legStyle: twin.activeConfiguration.legStyle,
      addedAccessories: []
    };
  }

  // --- 2. MASTER RENDER DISPATCHER ---
  function renderAll() {
    state.allTwins = DB.getAllTwins();
    state.availableRooms = DB.getAvailableRooms();
    const twin = getSelectedTwin();

    renderTwinCarousel();
    renderHeroTwinCanvas(twin);
    renderTabNavigation();
    renderActiveTabContent(twin);
    renderHeaderStats();
  }

  // Header quick statistics
  function renderHeaderStats() {
    const totalTwinsEl = document.getElementById("twinTotalCount");
    const totalValEl = document.getElementById("twinTotalValue");
    const avgScoreEl = document.getElementById("twinAvgScore");

    if (totalTwinsEl) totalTwinsEl.textContent = state.allTwins.length;
    if (totalValEl) {
      const val = state.allTwins.reduce((acc, t) => acc + (t.currentEstimatedValue || t.purchasePrice || 0), 0);
      totalValEl.textContent = "₹" + val.toLocaleString('en-IN');
    }
    if (avgScoreEl) {
      const avg = Math.round(state.allTwins.reduce((acc, t) => acc + (t.healthScore || 90), 0) / (state.allTwins.length || 1));
      avgScoreEl.textContent = avg + "%";
    }
  }

  // --- 3. TOP TWIN SELECTION CAROUSEL ---
  function renderTwinCarousel() {
    const container = document.getElementById("twinCarouselTrack");
    if (!container) return;

    container.innerHTML = state.allTwins.map(twin => {
      const isSelected = twin.id === state.selectedTwinId;
      return `
        <button onclick="window.FurnitureTwinApp.selectTwin('${twin.id}')" 
          class="shrink-0 p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3.5 min-w-[240px] sm:min-w-[270px] ${
            isSelected 
              ? 'bg-gradient-to-r from-antiqueGold/25 via-royalNavy to-black border-champagne shadow-[0_0_20px_rgba(201,162,39,0.3)] ring-1 ring-champagne' 
              : 'bg-black/60 hover:bg-black/80 border-antiqueGold/25 hover:border-antiqueGold/60 opacity-80 hover:opacity-100'
          }">
          <div class="relative w-14 h-14 rounded-xl overflow-hidden border border-antiqueGold/40 shrink-0 bg-black">
            <img src="${twin.image}" alt="${twin.name}" class="w-full h-full object-cover" />
            <span class="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#10B981]"></span>
          </div>
          <div class="overflow-hidden">
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="text-[9px] font-mono font-bold text-champagne px-1.5 py-0.2 rounded bg-antiqueGold/15 border border-antiqueGold/30">${twin.id}</span>
              <span class="text-[9px] text-stone-400 font-cinzel truncate">${twin.currentRoom}</span>
            </div>
            <h4 class="font-cinzel font-bold text-xs text-white truncate">${twin.name}</h4>
            <div class="text-[10px] text-stone-300 flex items-center gap-2 mt-1">
              <span class="text-emerald-400 font-bold">Health: ${twin.healthScore}%</span>
              <span class="text-stone-500">•</span>
              <span class="text-champagne font-mono">₹${(twin.purchasePrice || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>
        </button>
      `;
    }).join('');
  }

  // --- 4. HERO LIVING TWIN VISUAL CANVAS & TELEMETRY ---
  function renderHeroTwinCanvas(twin) {
    if (!twin) return;

    // Twin Name & Specs header
    const titleEl = document.getElementById("heroTwinTitle");
    const idEl = document.getElementById("heroTwinId");
    const roomBadgeEl = document.getElementById("heroTwinRoomBadge");
    const configBadgeEl = document.getElementById("heroTwinConfigBadge");
    const heroImageEl = document.getElementById("heroTwinImage");
    const colorSwatchEl = document.getElementById("heroTwinColorSwatch");
    const healthBadgeEl = document.getElementById("heroTwinHealth");

    if (titleEl) titleEl.textContent = twin.name;
    if (idEl) idEl.textContent = twin.id;
    if (roomBadgeEl) roomBadgeEl.innerHTML = `📍 Room: <strong class="text-champagne">${twin.currentRoom}</strong> (${twin.customRoomTag || 'Chamber'})`;
    if (configBadgeEl) configBadgeEl.textContent = twin.activeConfiguration.summaryText || `${twin.activeConfiguration.seater} in ${twin.activeConfiguration.color}`;
    if (heroImageEl) {
      heroImageEl.src = twin.image;
      heroImageEl.alt = twin.name;
    }
    if (colorSwatchEl) {
      colorSwatchEl.style.backgroundColor = twin.activeConfiguration.colorHex || "#0B3A2C";
    }
    if (healthBadgeEl) {
      healthBadgeEl.innerHTML = `Condition: <strong class="text-emerald-400">${twin.healthScore}% (${twin.conditionLabel})</strong>`;
    }

    // Telemetry indicators
    const telemetryContainer = document.getElementById("heroTelemetryGrid");
    if (telemetryContainer) {
      telemetryContainer.innerHTML = `
        <div class="p-3 bg-black/60 rounded-xl border border-antiqueGold/25">
          <div class="flex items-center justify-between text-[10px] text-stone-400 mb-1">
            <span>Timber Hydration</span>
            <span class="text-emerald-400 font-mono font-bold">9.4% (Optimal)</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-emerald-500 to-champagne w-[94%]"></div>
          </div>
        </div>

        <div class="p-3 bg-black/60 rounded-xl border border-antiqueGold/25">
          <div class="flex items-center justify-between text-[10px] text-stone-400 mb-1">
            <span>Joint Stress Index</span>
            <span class="text-emerald-400 font-mono font-bold">0.02 mm (Rock Solid)</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-emerald-500 to-blue-400 w-[98%]"></div>
          </div>
        </div>

        <div class="p-3 bg-black/60 rounded-xl border border-antiqueGold/25">
          <div class="flex items-center justify-between text-[10px] text-stone-400 mb-1">
            <span>Fabric UV Integrity</span>
            <span class="text-emerald-400 font-mono font-bold">99.1% (Zero Fade)</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-emerald-500 to-champagne w-[99%]"></div>
          </div>
        </div>

        <div class="p-3 bg-black/60 rounded-xl border border-antiqueGold/25">
          <div class="flex items-center justify-between text-[10px] text-stone-400 mb-1">
            <span>Warranty Longevity</span>
            <span class="text-champagne font-mono font-bold">${twin.warranty.remainingYears} Left</span>
          </div>
          <div class="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-antiqueGold to-champagne w-[92%]"></div>
          </div>
        </div>
      `;
    }
  }

  // --- 5. TAB NAVIGATION BAR ---
  function renderTabNavigation() {
    const tabs = [
      { id: "overview", label: "🪞 Twin Identity", badge: null },
      { id: "rooms", label: "🛋️ Room Placement & Collection", badge: state.allTwins.length },
      { id: "memory", label: "🧬 Memory Vault", badge: "Live" },
      { id: "companion", label: "✨ Smart Companion", badge: "AI" },
      { id: "simulation", label: "🎨 Change Simulation Lab", badge: "Interactive" },
      { id: "service", label: "🛠️ Service & Warranty Mode", badge: "Active" },
      { id: "timeline", label: "⏳ Event Timeline", badge: "6 Stages" }
    ];

    const container = document.getElementById("twinTabsContainer");
    if (!container) return;

    container.innerHTML = tabs.map(tab => {
      const isActive = tab.id === state.activeTab;
      return `
        <button onclick="window.FurnitureTwinApp.switchTab('${tab.id}')"
          class="px-4 py-2.5 rounded-xl font-cinzel font-bold text-xs whitespace-nowrap transition-all duration-300 flex items-center gap-2 ${
            isActive
              ? 'bg-gradient-to-r from-antiqueGold to-champagne text-black font-black shadow-[0_0_15px_rgba(201,162,39,0.5)] transform scale-[1.02]'
              : 'bg-black/50 text-stone-300 hover:text-white hover:bg-white/10 border border-antiqueGold/25'
          }">
          <span>${tab.label}</span>
          ${tab.badge ? `<span class="text-[9px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black text-champagne' : 'bg-antiqueGold/20 text-champagne'} font-mono">${tab.badge}</span>` : ''}
        </button>
      `;
    }).join('');
  }

  // --- 6. TAB CONTENT RENDERER ---
  function renderActiveTabContent(twin) {
    const container = document.getElementById("twinActiveTabContent");
    if (!container) return;

    switch (state.activeTab) {
      case "overview":
        container.innerHTML = renderOverviewTab(twin);
        break;
      case "rooms":
        container.innerHTML = renderRoomsTab(twin);
        break;
      case "memory":
        container.innerHTML = renderMemoryTab(twin);
        break;
      case "companion":
        container.innerHTML = renderCompanionTab(twin);
        break;
      case "simulation":
        container.innerHTML = renderSimulationTab(twin);
        break;
      case "service":
        container.innerHTML = renderServiceTab(twin);
        break;
      case "timeline":
        container.innerHTML = renderTimelineTab(twin);
        break;
      default:
        container.innerHTML = renderOverviewTab(twin);
    }
  }

  // =========================================================================
  // TAB 1: OVERVIEW & DIGITAL TWIN IDENTITY CARD
  // =========================================================================
  function renderOverviewTab(twin) {
    return `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 font-sans">
        
        <!-- Left 7 Cols: Digital Twin Identity Card -->
        <div class="lg:col-span-7 bg-gradient-to-br from-royalNavy/90 via-royalPurple/80 to-obsidian/95 p-6 rounded-2xl border border-antiqueGold/40 shadow-2xl space-y-6">
          
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/25 pb-4">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded">Digital Twin Identity Card</span>
              <h3 class="text-xl sm:text-2xl font-cinzelDecor font-bold text-white gold-gradient-text mt-1">${twin.name}</h3>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-stone-400 block">Current Estimated Value</span>
              <strong class="text-lg font-cinzel font-black text-champagne">₹${(twin.currentEstimatedValue || twin.purchasePrice).toLocaleString('en-IN')}</strong>
            </div>
          </div>

          <!-- Quick Spec Matrix -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Furniture Twin ID:</span>
              <strong class="text-champagne font-mono">${twin.id}</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Current Room:</span>
              <strong class="text-white">${twin.currentRoom}</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Configuration:</span>
              <strong class="text-emerald-400">${twin.activeConfiguration.seater}</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Active Color:</span>
              <strong class="text-white flex items-center gap-1.5">
                <span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${twin.activeConfiguration.colorHex || '#0B3A2C'}"></span>
                ${twin.activeConfiguration.color}
              </strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Material & Fabric:</span>
              <strong class="text-stone-200">${twin.activeConfiguration.fabric}</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Timber Finish:</span>
              <strong class="text-stone-200">${twin.activeConfiguration.woodFinish}</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Purchase Date:</span>
              <strong class="text-stone-200">${twin.purchaseDate}</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Warranty Status:</span>
              <strong class="text-emerald-400">${twin.warranty.status} (${twin.warranty.remainingYears})</strong>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Service Status:</span>
              <strong class="text-champagne">${twin.serviceStatus}</strong>
            </div>
          </div>

          <!-- Configuration String Box -->
          <div class="p-4 bg-black/70 rounded-xl border border-antiqueGold/30">
            <div class="flex items-center justify-between text-xs text-stone-400 mb-1">
              <span class="font-cinzel font-bold text-champagne flex items-center gap-1.5">
                <span>🔒</span> Permanent Configuration Memory
              </span>
              <span class="text-[10px] text-emerald-400 font-mono">LOCKED & RECORDED</span>
            </div>
            <p class="font-mono text-sm text-white bg-black/90 px-3 py-2 rounded-lg border border-white/10 select-all">
              "${twin.activeConfiguration.summaryText}"
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button onclick="window.FurnitureTwinApp.openMoveRoomModal('${twin.id}')" 
              class="btn-outline-gold px-4 py-2 rounded-xl text-xs font-cinzel font-bold flex items-center gap-2">
              <span>🧭</span> Reassign Room
            </button>
            <button onclick="window.FurnitureTwinApp.switchTab('simulation')" 
              class="btn-gold px-4 py-2 rounded-xl text-xs font-cinzel font-black shadow flex items-center gap-2">
              <span>🎨</span> Simulate Changes
            </button>
            <button onclick="window.FurnitureTwinApp.openScheduleServiceModal('${twin.id}')" 
              class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2 transition">
              <span>🛠️</span> Book Service Butler
            </button>
          </div>

        </div>

        <!-- Right 5 Cols: Quick Room Ensemble & Next Maintenance Alert -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Upcoming Maintenance Card -->
          <div class="bg-gradient-to-br from-black/80 to-royalNavy/60 p-5 rounded-2xl border border-antiqueGold/30 space-y-3">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-1.5">
                <span>⏰</span> Next Scheduled Service
              </h4>
              <span class="badge-gold text-[9px] bg-emerald-950 text-emerald-400">Scheduled</span>
            </div>
            ${
              twin.upcomingMaintenance && twin.upcomingMaintenance.length > 0
                ? `
                  <div class="p-3 bg-black/70 rounded-xl border border-white/10 space-y-1.5">
                    <strong class="text-xs text-white block">${twin.upcomingMaintenance[0].title}</strong>
                    <div class="flex items-center justify-between text-[10px] text-stone-400">
                      <span>Due Date: <strong class="text-champagne font-mono">${twin.upcomingMaintenance[0].dueDate}</strong></span>
                      <span>Est. Cost: <strong class="text-white font-mono">₹${twin.upcomingMaintenance[0].estimatedCost}</strong></span>
                    </div>
                    <p class="text-[10px] text-stone-300 leading-relaxed">${twin.upcomingMaintenance[0].reason}</p>
                  </div>
                `
                : `<p class="text-xs text-stone-400">No pending maintenance required.</p>`
            }
            <button onclick="window.FurnitureTwinApp.switchTab('service')" class="w-full py-2 bg-antiqueGold/15 hover:bg-antiqueGold/30 text-champagne text-xs font-cinzel font-bold rounded-xl border border-antiqueGold/30 transition text-center block">
              Manage Service & Warranty Mode →
            </button>
          </div>

          <!-- Room Context Teaser -->
          <div class="bg-gradient-to-br from-black/80 to-royalPurple/50 p-5 rounded-2xl border border-antiqueGold/30 space-y-3">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <h4 class="font-cinzel font-bold text-sm text-white flex items-center gap-1.5">
                <span>🏛️</span> Placed in: ${twin.currentRoom}
              </h4>
              <button onclick="window.FurnitureTwinApp.switchTab('rooms')" class="text-xs text-champagne font-cinzel hover:underline">
                View Room Twin →
              </button>
            </div>
            <p class="text-xs text-stone-300 leading-relaxed">
              This piece is currently co-located in <strong>${twin.currentRoom}</strong> alongside matching companions, delivering optimal spatial circulation and acoustic harmony.
            </p>
            <div class="flex items-center gap-2 pt-1">
              <span class="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-stone-300">Room Harmony: <strong>96%</strong></span>
              <span class="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-stone-300">Total Room Pieces: <strong>${DB.getTwinsByRoom(twin.currentRoom).length}</strong></span>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // =========================================================================
  // TAB 2: ROOM PLACEMENT & SMART ROOM COLLECTION
  // =========================================================================
  function renderRoomsTab(currentTwin) {
    const rooms = state.availableRooms;
    const selectedRoom = state.activeRoomFilter;
    const roomMetrics = DB.calculateRoomMetrics(selectedRoom);
    const roomTwins = DB.getTwinsByRoom(selectedRoom);

    return `
      <div class="space-y-6 font-sans">
        
        <!-- Room Selector Bar + Add Custom Room Button -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-black/60 p-3.5 rounded-2xl border border-antiqueGold/30">
          <div class="flex flex-wrap items-center gap-2">
            <button onclick="window.FurnitureTwinApp.filterByRoom('All')"
              class="px-3.5 py-1.5 rounded-xl font-cinzel text-xs font-bold transition ${
                selectedRoom === 'All'
                  ? 'bg-antiqueGold text-black font-black shadow'
                  : 'bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 border border-white/15'
              }">
              🏰 All Palace Rooms (${state.allTwins.length})
            </button>
            ${rooms.map(room => {
              const count = DB.getTwinsByRoom(room).length;
              const isActive = selectedRoom.toLowerCase() === room.toLowerCase();
              return `
                <button onclick="window.FurnitureTwinApp.filterByRoom('${room}')"
                  class="px-3.5 py-1.5 rounded-xl font-cinzel text-xs font-bold transition flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-antiqueGold text-black font-black shadow'
                      : 'bg-white/5 text-stone-300 hover:text-white hover:bg-white/10 border border-white/15'
                  }">
                  <span>${room}</span>
                  <span class="text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black text-champagne' : 'bg-black/60 text-stone-400'} font-mono">${count}</span>
                </button>
              `;
            }).join('')}
          </div>

          <button onclick="window.FurnitureTwinApp.openAddCustomRoomModal()"
            class="btn-outline-gold text-xs font-cinzel font-bold px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 ml-auto">
            <span>+</span> Add Custom Room
          </button>
        </div>

        <!-- Room Harmony & Collection Intel Banner -->
        <div class="bg-gradient-to-r from-royalNavy/90 via-royalPurple/80 to-obsidian/95 p-6 rounded-2xl border border-antiqueGold/40 shadow-xl space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/20 pb-4">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2 py-0.2 rounded">Smart Room Collection Twin</span>
              <h3 class="text-xl sm:text-2xl font-cinzelDecor font-bold text-white gold-gradient-text mt-0.5">
                ${selectedRoom === 'All' ? 'ALL PALACE ROOMS TWIN' : `${selectedRoom.toUpperCase()} TWIN`}
              </h3>
            </div>
            <div class="flex items-center gap-4 text-xs">
              <div class="text-right">
                <span class="text-[10px] text-stone-400 block">Room Harmony Score</span>
                <strong class="text-emerald-400 font-cinzel text-lg">${roomMetrics.harmonyScore}% (Curated Harmony)</strong>
              </div>
              <div class="text-right pl-4 border-l border-white/15">
                <span class="text-[10px] text-stone-400 block">Total Room Value</span>
                <strong class="text-champagne font-cinzel text-lg">₹${roomMetrics.totalValue.toLocaleString('en-IN')}</strong>
              </div>
            </div>
          </div>

          <!-- Room Architectural Rationale -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div class="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
              <span class="text-champagne font-bold block flex items-center gap-1">
                <span>🎨</span> Color Palette Synergy
              </span>
              <p class="text-stone-300 text-[11px] leading-relaxed">${roomMetrics.paletteDescription}</p>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
              <span class="text-champagne font-bold block flex items-center gap-1">
                <span>📐</span> Spatial Circulation
              </span>
              <p class="text-stone-300 text-[11px] leading-relaxed">${roomMetrics.circulationAssessment}</p>
            </div>
            <div class="p-3 bg-black/60 rounded-xl border border-white/10 space-y-1">
              <span class="text-champagne font-bold block flex items-center gap-1">
                <span>✨</span> Butler Styling Advice
              </span>
              <p class="text-stone-300 text-[11px] leading-relaxed">${roomMetrics.stylingAdvice}</p>
            </div>
          </div>
        </div>

        <!-- Furniture Pieces in Room Grid -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="font-cinzel font-bold text-base text-white">
              Furniture Assigned to ${selectedRoom === 'All' ? 'Palace Collection' : selectedRoom} (${roomTwins.length})
            </h4>
            <span class="text-xs text-stone-400">Click any card to inspect or move room</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${roomTwins.map(t => {
              const isSelected = t.id === state.selectedTwinId;
              return `
                <div class="bg-black/75 rounded-2xl border transition-all duration-300 p-4 space-y-3 relative group ${
                  isSelected ? 'border-champagne ring-1 ring-champagne shadow-[0_0_20px_rgba(201,162,39,0.3)]' : 'border-antiqueGold/30 hover:border-antiqueGold'
                }">
                  <div class="relative h-44 rounded-xl overflow-hidden bg-black border border-white/10">
                    <img src="${t.image}" alt="${t.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <span class="absolute top-2 left-2 badge-gold text-[9px] font-mono">${t.id}</span>
                    <span class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-black/80 text-champagne border border-antiqueGold/40">${t.currentRoom}</span>
                  </div>

                  <div>
                    <h5 class="font-cinzel font-bold text-sm text-white truncate">${t.name}</h5>
                    <p class="text-[11px] text-stone-400 font-mono truncate mt-0.5">${t.activeConfiguration.summaryText}</p>
                  </div>

                  <div class="grid grid-cols-2 gap-2 text-[10px] pt-1 border-t border-white/10 font-sans">
                    <div><span class="text-stone-400">Condition:</span> <strong class="text-emerald-400">${t.healthScore}%</strong></div>
                    <div class="text-right"><span class="text-stone-400">Valuation:</span> <strong class="text-champagne font-mono">₹${(t.currentEstimatedValue || t.purchasePrice).toLocaleString('en-IN')}</strong></div>
                  </div>

                  <div class="flex items-center gap-2 pt-1">
                    <button onclick="window.FurnitureTwinApp.selectTwin('${t.id}')"
                      class="flex-1 py-1.5 rounded-lg text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-white transition text-center">
                      Select Twin 🪞
                    </button>
                    <button onclick="window.FurnitureTwinApp.openMoveRoomModal('${t.id}')"
                      class="px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold btn-outline-gold">
                      Move 🧭
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // TAB 3: FURNITURE MEMORY VAULT
  // =========================================================================
  function renderMemoryTab(twin) {
    return `
      <div class="space-y-6 font-sans">
        
        <div class="bg-gradient-to-r from-royalNavy/90 to-royalPurple/80 p-5 rounded-2xl border border-antiqueGold/40 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/20 pb-3">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2 py-0.2 rounded">Permanent Memory Vault</span>
              <h3 class="text-xl font-cinzelDecor font-bold text-white gold-gradient-text mt-0.5">
                MEMORY LOG FOR ${twin.name.toUpperCase()}
              </h3>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-stone-400 block">Cryptographic ID</span>
              <strong class="text-xs font-mono text-champagne">${twin.id}</strong>
            </div>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed mt-2">
            Friends Furniture permanently records every customization, room movement, butler service, repair ticket, accessory pairing, and warranty verification throughout this piece's multi-decade ownership.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- 1. Original Config vs Active Customization -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
              <span>🎨</span> Original vs Current Configuration Memory
            </h4>

            <!-- Factory Original -->
            <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
              <div class="flex items-center justify-between text-[10px]">
                <span class="badge-gold text-[8px]">FACTORY ORIGINAL</span>
                <span class="text-stone-400 font-mono">${twin.purchaseDate}</span>
              </div>
              <strong class="text-xs text-stone-200 block font-mono">${twin.originalConfiguration.summaryText}</strong>
              ${twin.originalConfiguration.customizedAtPurchase ? `<p class="text-[10px] text-stone-400">${twin.originalConfiguration.customizedAtPurchase}</p>` : ''}
            </div>

            <!-- Active Configuration -->
            <div class="p-3 bg-antiqueGold/10 rounded-xl border border-antiqueGold/40 space-y-1">
              <div class="flex items-center justify-between text-[10px]">
                <span class="badge-gold text-[8px] bg-emerald-950 text-emerald-400 border-emerald-500/40">ACTIVE DIGITAL TWIN STATE</span>
                <span class="text-champagne font-mono">Present</span>
              </div>
              <strong class="text-xs text-white block font-mono">${twin.activeConfiguration.summaryText}</strong>
            </div>

            <!-- Configuration History Log -->
            <div class="space-y-2 pt-2 border-t border-white/10">
              <span class="text-[11px] font-cinzel font-bold text-stone-400 block">Configuration Revision Audit Trail:</span>
              <div class="space-y-2 max-h-40 overflow-y-auto pr-1">
                ${(twin.configurationHistory || []).map(h => `
                  <div class="p-2 bg-black/60 rounded-lg border border-white/10 text-[10px] space-y-0.5">
                    <div class="flex justify-between text-stone-400">
                      <span class="font-mono text-champagne">${h.date}</span>
                      <span>${h.author}</span>
                    </div>
                    <p class="text-stone-200">${h.change}</p>
                  </div>
                `).join('')}
              </div>
            </div>

            <button onclick="window.FurnitureTwinApp.revertFactoryConfig('${twin.id}')"
              class="w-full py-2 bg-white/5 hover:bg-white/10 text-stone-300 text-xs font-cinzel font-bold rounded-xl border border-white/20 transition">
              Revert to Factory Original Configuration ↺
            </button>
          </div>

          <!-- 2. Room Placement History Memory -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
              <span>🧭</span> Room Placement Journey Memory
            </h4>
            <div class="space-y-3 max-h-60 overflow-y-auto pr-1">
              ${(twin.roomPlacementHistory || []).map((m, idx) => `
                <div class="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1 relative">
                  <div class="flex items-center justify-between text-[10px]">
                    <span class="font-mono text-champagne font-bold">${m.date}</span>
                    <span class="text-stone-400 font-mono">Move #${twin.roomPlacementHistory.length - idx}</span>
                  </div>
                  <div class="flex items-center gap-2 text-white font-bold">
                    <span>${m.fromRoom}</span>
                    <span class="text-champagne">→</span>
                    <span class="text-emerald-400">${m.toRoom}</span>
                  </div>
                  <p class="text-[10px] text-stone-300">${m.reason}</p>
                </div>
              `).join('')}
            </div>

            <button onclick="window.FurnitureTwinApp.openMoveRoomModal('${twin.id}')"
              class="w-full py-2 btn-gold text-xs font-cinzel font-black rounded-xl shadow transition">
              Relocate Furniture to Another Room →
            </button>
          </div>

          <!-- 3. Paired Accessories & Replacement Parts Memory -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
              <span>💎</span> Attached Accessories & Parts Memory
            </h4>

            <div class="space-y-2">
              <span class="text-[11px] font-cinzel font-bold text-stone-300 block">Accessories Purchased & Paired:</span>
              ${(twin.accessoriesPurchased && twin.accessoriesPurchased.length > 0)
                ? twin.accessoriesPurchased.map(a => `
                  <div class="p-2.5 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                    <div>
                      <strong class="text-white block">${a.name}</strong>
                      <span class="text-[10px] text-stone-400 font-mono">Paired on ${a.purchaseDate} • ₹${(a.price || 0).toLocaleString('en-IN')}</span>
                    </div>
                    <span class="badge-gold text-[8px] bg-emerald-950 text-emerald-400 border-emerald-500/40">${a.status}</span>
                  </div>
                `).join('')
                : `<p class="text-xs text-stone-400 italic">No companion accessories currently paired.</p>`
              }
            </div>

            <div class="space-y-2 pt-2 border-t border-white/10">
              <span class="text-[11px] font-cinzel font-bold text-stone-300 block">Replacement Parts Fitted:</span>
              ${(twin.replacementPartsFitted && twin.replacementPartsFitted.length > 0)
                ? twin.replacementPartsFitted.map(p => `
                  <div class="p-2.5 bg-white/5 rounded-xl border border-white/10 flex justify-between items-center text-xs">
                    <div>
                      <strong class="text-white block">${p.name}</strong>
                      <span class="text-[10px] text-stone-400 font-mono">Fitted on ${p.date} • ${p.status}</span>
                    </div>
                    <span class="badge-gold text-[8px]">OEM Part</span>
                  </div>
                `).join('')
                : `<p class="text-xs text-stone-400 italic">All factory-original components intact. Zero replacement required to date.</p>`
              }
            </div>
          </div>

          <!-- 4. Warranty & Service Audit Memory -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
              <span>📜</span> Warranty & Butler Inspection Vault
            </h4>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="text-stone-400">Warranty Certificate:</span>
                <strong class="text-champagne font-mono">${twin.warranty.certificateId}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-400">Coverage Period:</span>
                <strong class="text-white font-mono">${twin.warranty.startDate} – ${twin.warranty.expiryDate}</strong>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-400">Claims Logged:</span>
                <strong class="text-emerald-400 font-mono">${twin.warranty.claimsCount || 0} Claims (Active Clean)</strong>
              </div>
            </div>

            <div class="space-y-2">
              <span class="text-[11px] font-cinzel font-bold text-stone-300 block">Recent Service History:</span>
              <div class="space-y-2 max-h-40 overflow-y-auto pr-1">
                ${(twin.serviceHistory || []).map(s => `
                  <div class="p-2.5 bg-black/60 rounded-xl border border-white/10 text-[10px] space-y-0.5">
                    <div class="flex justify-between">
                      <strong class="text-white">${s.type}</strong>
                      <span class="font-mono text-champagne">${s.date}</span>
                    </div>
                    <p class="text-stone-400">Butler: <strong class="text-stone-200">${s.technician}</strong></p>
                    <p class="text-stone-300 italic">${s.notes}</p>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  // =========================================================================
  // TAB 4: SMART COMPANION RECOMMENDATIONS (Contextual & Non-random)
  // =========================================================================
  function renderCompanionTab(twin) {
    const comp = twin.smartCompanions || {};

    return `
      <div class="space-y-6 font-sans">
        
        <div class="bg-gradient-to-r from-royalNavy/90 via-royalPurple/80 to-obsidian/95 p-5 rounded-2xl border border-antiqueGold/40 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/20 pb-3">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2 py-0.2 rounded">Architectural Intelligence Engine</span>
              <h3 class="text-xl font-cinzelDecor font-bold text-white gold-gradient-text mt-0.5">
                SMART COMPANIONS FOR ${twin.name.toUpperCase()}
              </h3>
            </div>
            <span class="text-xs text-champagne font-mono bg-black/60 px-3 py-1 rounded-lg border border-antiqueGold/30">
              Zero Random Suggestions • 100% Rationale-Driven
            </span>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed mt-2">
            Every suggestion below is calculated specifically from your <strong>${twin.name}</strong> (${twin.activeConfiguration.summaryText}) and its placement in <strong>${twin.currentRoom}</strong>.
          </p>
        </div>

        <!-- 1. Matching Furniture -->
        <div class="space-y-3">
          <h4 class="font-cinzel font-bold text-sm text-white flex items-center gap-2">
            <span>🛋️</span> Architecturally Matching Furniture
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${(comp.matchingFurniture || []).map(item => `
              <div class="p-4 bg-black/75 rounded-2xl border border-antiqueGold/30 flex flex-col sm:flex-row gap-4 hover:border-antiqueGold transition">
                <img src="${item.image}" alt="${item.name}" class="w-full sm:w-32 h-32 rounded-xl object-cover border border-white/10 shrink-0" />
                <div class="space-y-2 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="badge-gold text-[8px] bg-emerald-950 text-emerald-400">${item.compatibilityScore}% Compatibility</span>
                    <strong class="text-champagne font-mono text-xs">₹${item.price.toLocaleString('en-IN')}</strong>
                  </div>
                  <h5 class="font-cinzel font-bold text-xs text-white">${item.name}</h5>
                  <div class="p-2.5 bg-white/5 rounded-lg border border-white/10 text-[10px] text-stone-300 leading-relaxed">
                    <strong class="text-champagne block mb-0.5">Why suggested:</strong>
                    ${item.whyRecommended}
                  </div>
                  <a href="catalog.html" class="inline-block py-1 px-3 text-[10px] font-cinzel font-bold btn-outline-gold rounded-lg">
                    Explore Companion →
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. Compatible Accessories -->
        <div class="space-y-3">
          <h4 class="font-cinzel font-bold text-sm text-white flex items-center gap-2">
            <span>💎</span> Compatible Bespoke Accessories
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${(comp.compatibleAccessories || []).map(acc => `
              <div class="p-4 bg-black/75 rounded-2xl border border-antiqueGold/30 flex flex-col sm:flex-row gap-4 hover:border-antiqueGold transition">
                <img src="${acc.image}" alt="${acc.name}" class="w-full sm:w-28 h-28 rounded-xl object-cover border border-white/10 shrink-0" />
                <div class="space-y-2 flex-1">
                  <div class="flex items-center justify-between">
                    <span class="badge-gold text-[8px]">100% Fit Guarantee</span>
                    <strong class="text-champagne font-mono text-xs">₹${acc.price.toLocaleString('en-IN')}</strong>
                  </div>
                  <h5 class="font-cinzel font-bold text-xs text-white">${acc.name}</h5>
                  <div class="p-2.5 bg-white/5 rounded-lg border border-white/10 text-[10px] text-stone-300 leading-relaxed">
                    <strong class="text-champagne block mb-0.5">Why suggested:</strong>
                    ${acc.whyRecommended}
                  </div>
                  <button onclick="window.FurnitureTwinApp.pairAccessory('${twin.id}', '${acc.name.replace(/'/g, "\\'")}', ${acc.price})"
                    class="py-1 px-3 text-[10px] font-cinzel font-black btn-gold rounded-lg shadow">
                    + Pair With Digital Twin
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Replacement Parts & Maintenance Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Replacement Parts -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-3">
            <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
              <span>⚙️</span> Genuine Replacement Parts
            </h4>
            <div class="space-y-3">
              ${(comp.replacementParts || []).map(part => `
                <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
                  <div class="flex justify-between items-center">
                    <strong class="text-white">${part.name}</strong>
                    <span class="text-champagne font-mono font-bold">₹${part.price.toLocaleString('en-IN')}</span>
                  </div>
                  <p class="text-[10px] text-stone-300">${part.whyRecommended}</p>
                  <button onclick="window.FurnitureTwinApp.orderPart('${twin.id}', '${part.name.replace(/'/g, "\\'")}', ${part.price})"
                    class="py-1 px-2.5 text-[10px] font-cinzel font-bold btn-outline-gold rounded-lg">
                    Order Genuine Part 🛒
                  </button>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Room Improvement Suggestions -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-3">
            <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
              <span>🏛️</span> Room Improvement Suggestions
            </h4>
            <div class="space-y-3">
              ${(comp.roomImprovements || []).map(tip => `
                <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
                  <strong class="text-white flex items-center gap-1.5">
                    <span>💡</span> ${tip.tip}
                  </strong>
                  <p class="text-[10px] text-stone-300 leading-relaxed">${tip.whyRecommended}</p>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // =========================================================================
  // TAB 5: FURNITURE CHANGE SIMULATION LAB (Before & After Preview)
  // =========================================================================
  function renderSimulationTab(twin) {
    const draft = state.simulationDraft;
    const isModified = draft.color !== twin.activeConfiguration.color ||
                       draft.fabric !== twin.activeConfiguration.fabric ||
                       draft.woodFinish !== twin.activeConfiguration.woodFinish ||
                       draft.seater !== twin.activeConfiguration.seater;

    const colors = [
      { name: "Emerald Palace", hex: "#0B3A2C" },
      { name: "Royal Blue", hex: "#1B2A4A" },
      { name: "Royal Purple", hex: "#2E114D" },
      { name: "Midnight Obsidian", hex: "#121212" },
      { name: "Champagne Ivory", hex: "#F1D78B" },
      { name: "Warm Amber Sheesham", hex: "#8B4513" },
      { name: "Bordeaux Burgundy", hex: "#4A0E17" }
    ];

    const fabrics = [
      "Royal Silk Velvet",
      "Italian Full-Grain Leather",
      "High-Tactile Wool Bouclé",
      "Belgian Natural Linen",
      "Silk Damask Jacquard"
    ];

    const finishes = [
      { name: "Nilambur Seasoned Teak", hex: "#4A2E1B" },
      { name: "Rare Live-Edge Solid Sheesham", hex: "#5A2D0C" },
      { name: "Bavarian White Oak", hex: "#3E2723" },
      { name: "Matte Obsidian Steel & Gold", hex: "#1C1C1C" },
      { name: "Bleached Scandinavian Ash", hex: "#D4C3A3" }
    ];

    const seaters = [
      "Compact 2-Seater Suite",
      "3-Seater Sovereign Grand",
      "4-Seater Imperial Salon",
      "L-Sectional Left Lounge",
      "L-Sectional Right Lounge",
      "U-Modular Palace Grand"
    ];

    return `
      <div class="space-y-6 font-sans">
        
        <div class="bg-gradient-to-r from-royalNavy/90 via-royalPurple/80 to-obsidian/95 p-5 rounded-2xl border border-antiqueGold/40 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/20 pb-3">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2 py-0.2 rounded">Interactive Simulation Lab</span>
              <h3 class="text-xl font-cinzelDecor font-bold text-white gold-gradient-text mt-0.5">
                FURNITURE CHANGE SIMULATION
              </h3>
            </div>
            <span class="text-xs text-champagne font-mono bg-black/60 px-3 py-1 rounded-lg border border-antiqueGold/30">
              Live Before & After Visual Engine
            </span>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed mt-2">
            Simulate custom color re-upholstery, wood re-finishing, modular expansion, or accessory pairings on your <strong>${twin.name}</strong>. Preview differences visually before confirming permanent memory updates.
          </p>
        </div>

        <!-- Side-by-Side Before & After Simulation View -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <!-- BEFORE: Current Active Twin -->
          <div class="bg-black/80 p-5 rounded-2xl border border-white/20 space-y-3 relative">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span class="badge-gold text-[9px] bg-stone-900 text-stone-300">BEFORE (ACTIVE TWIN)</span>
              <span class="text-xs text-stone-400 font-mono font-bold">${twin.id}</span>
            </div>
            
            <div class="relative h-64 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
              <img src="${twin.image}" alt="${twin.name}" class="w-full h-full object-cover opacity-90" />
              <div class="absolute bottom-2 left-2 right-2 p-2 bg-black/85 backdrop-blur-md rounded-lg border border-white/10 text-[10px] text-stone-200">
                <div class="flex items-center justify-between font-mono">
                  <span>Color: <strong>${twin.activeConfiguration.color}</strong></span>
                  <span>Fabric: <strong>${twin.activeConfiguration.fabric}</strong></span>
                </div>
              </div>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10 text-xs space-y-1 font-mono">
              <div class="flex justify-between text-stone-400"><span>Seater:</span><strong class="text-white">${twin.activeConfiguration.seater}</strong></div>
              <div class="flex justify-between text-stone-400"><span>Finish:</span><strong class="text-white">${twin.activeConfiguration.woodFinish}</strong></div>
              <div class="flex justify-between text-stone-400"><span>Estimated Value:</span><strong class="text-champagne">₹${(twin.currentEstimatedValue || twin.purchasePrice).toLocaleString('en-IN')}</strong></div>
            </div>
          </div>

          <!-- AFTER: Simulated Digital Twin Preview -->
          <div class="bg-gradient-to-b from-antiqueGold/15 via-royalNavy/80 to-obsidian p-5 rounded-2xl border-2 border-champagne shadow-[0_0_30px_rgba(201,162,39,0.3)] space-y-3 relative">
            <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-2">
              <span class="badge-gold text-[9px] bg-emerald-950 text-emerald-400 border-emerald-500/50 animate-pulse">AFTER (SIMULATED PREVIEW)</span>
              <span class="text-xs text-champagne font-mono font-bold">${isModified ? 'Modified State' : 'Unchanged'}</span>
            </div>

            <!-- Dynamic Image Overlay with Live Color Tint Filter -->
            <div class="relative h-64 rounded-xl overflow-hidden bg-black border border-champagne flex items-center justify-center">
              <img src="${twin.image}" alt="Simulated ${twin.name}" class="w-full h-full object-cover transition-all duration-500" />
              <!-- Color Wash Overlay -->
              <div class="absolute inset-0 transition-all duration-500 mix-blend-color opacity-60" style="background-color: ${draft.colorHex};"></div>
              
              <div class="absolute top-2 right-2 badge-gold text-[9px] font-mono">
                SIMULATION ACTIVE
              </div>

              <div class="absolute bottom-2 left-2 right-2 p-2 bg-black/90 backdrop-blur-md rounded-lg border border-antiqueGold/40 text-[10px] text-white">
                <div class="flex items-center justify-between font-mono">
                  <span>Color: <strong class="text-champagne">${draft.color}</strong></span>
                  <span>Fabric: <strong class="text-emerald-400">${draft.fabric}</strong></span>
                </div>
              </div>
            </div>

            <div class="p-3 bg-black/70 rounded-xl border border-antiqueGold/30 text-xs space-y-1 font-mono">
              <div class="flex justify-between text-stone-300"><span>Simulated Seater:</span><strong class="text-champagne">${draft.seater}</strong></div>
              <div class="flex justify-between text-stone-300"><span>Simulated Finish:</span><strong class="text-champagne">${draft.woodFinish}</strong></div>
              <div class="flex justify-between text-stone-300"><span>Upgrade Delta:</span><strong class="text-emerald-400">${isModified ? '+₹18,500 (Bespoke Kit)' : '₹0'}</strong></div>
            </div>
          </div>

        </div>

        <!-- Simulation Controls Panel -->
        <div class="bg-black/75 p-6 rounded-2xl border border-antiqueGold/30 space-y-6">
          <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-2 border-b border-white/10 pb-2">
            <span>🎛️</span> Change Simulation Parameters
          </h4>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- 1. Color Palette Swatches -->
            <div class="space-y-2">
              <label class="text-xs font-cinzel font-bold text-white block">1. Color Palette:</label>
              <div class="grid grid-cols-2 gap-2">
                ${colors.map(c => `
                  <button onclick="window.FurnitureTwinApp.setSimulationColor('${c.name}', '${c.hex}')"
                    class="p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                      draft.color === c.name ? 'border-champagne bg-white/10 ring-1 ring-champagne' : 'border-white/10 bg-black/50 hover:bg-white/5'
                    }">
                    <span class="w-4 h-4 rounded-full border border-black shrink-0" style="background-color: ${c.hex};"></span>
                    <span class="text-[10px] text-white truncate font-medium">${c.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 2. Fabric Switcher -->
            <div class="space-y-2">
              <label class="text-xs font-cinzel font-bold text-white block">2. Fabric / Material:</label>
              <div class="space-y-1.5">
                ${fabrics.map(f => `
                  <button onclick="window.FurnitureTwinApp.setSimulationFabric('${f}')"
                    class="w-full p-2 rounded-xl border text-left text-xs transition ${
                      draft.fabric === f ? 'border-champagne bg-antiqueGold/20 text-white font-bold' : 'border-white/10 bg-black/50 text-stone-300 hover:bg-white/5'
                    }">
                    ${f}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 3. Wood Finish Switcher -->
            <div class="space-y-2">
              <label class="text-xs font-cinzel font-bold text-white block">3. Timber & Base Finish:</label>
              <div class="space-y-1.5">
                ${finishes.map(w => `
                  <button onclick="window.FurnitureTwinApp.setSimulationFinish('${w.name}', '${w.hex}')"
                    class="w-full p-2 rounded-xl border text-left text-xs transition flex items-center gap-2 ${
                      draft.woodFinish === w.name ? 'border-champagne bg-antiqueGold/20 text-white font-bold' : 'border-white/10 bg-black/50 text-stone-300 hover:bg-white/5'
                    }">
                    <span class="w-3 h-3 rounded-full shrink-0" style="background-color: ${w.hex};"></span>
                    <span class="truncate">${w.name}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 4. Seater Configuration -->
            <div class="space-y-2">
              <label class="text-xs font-cinzel font-bold text-white block">4. Modular Configuration:</label>
              <div class="space-y-1.5">
                ${seaters.map(s => `
                  <button onclick="window.FurnitureTwinApp.setSimulationSeater('${s}')"
                    class="w-full p-2 rounded-xl border text-left text-xs transition ${
                      draft.seater === s ? 'border-champagne bg-antiqueGold/20 text-white font-bold' : 'border-white/10 bg-black/50 text-stone-300 hover:bg-white/5'
                    }">
                    ${s}
                  </button>
                `).join('')}
              </div>
            </div>

          </div>

          <!-- Simulation Commit / Order Strip -->
          <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div>
              <span class="text-xs text-stone-400 block">Simulated Configuration Memory:</span>
              <strong class="text-sm font-mono text-champagne">${twin.shortName} → ${draft.color} → ${draft.woodFinish} → ${draft.seater}</strong>
            </div>

            <div class="flex items-center gap-3">
              <button onclick="window.FurnitureTwinApp.resetSimulation()" 
                class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300 transition">
                Reset Draft ↺
              </button>
              <button onclick="window.FurnitureTwinApp.applySimulationToTwin('${twin.id}')" 
                class="btn-gold px-6 py-2.5 rounded-xl text-xs font-cinzel font-black shadow-lg">
                Apply to Digital Twin ✓
              </button>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // =========================================================================
  // TAB 6: SERVICE & WARRANTY MODE
  // =========================================================================
  function renderServiceTab(twin) {
    return `
      <div class="space-y-6 font-sans">
        
        <div class="bg-gradient-to-r from-royalNavy/90 via-royalPurple/80 to-obsidian/95 p-5 rounded-2xl border border-antiqueGold/40 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/20 pb-3">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2 py-0.2 rounded">Comprehensive Service Suite</span>
              <h3 class="text-xl font-cinzelDecor font-bold text-white gold-gradient-text mt-0.5">
                SERVICE & WARRANTY MODE
              </h3>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.FurnitureTwinApp.openSubmitRepairModal('${twin.id}')"
                class="btn-outline-gold text-xs font-cinzel font-bold px-3 py-1.5 rounded-xl">
                + Request Repair 🛠️
              </button>
              <button onclick="window.FurnitureTwinApp.openSubmitWarrantyClaimModal('${twin.id}')"
                class="btn-gold text-xs font-cinzel font-black px-3.5 py-1.5 rounded-xl shadow">
                File Warranty Claim 📜
              </button>
            </div>
          </div>
          <p class="text-xs text-stone-300 leading-relaxed mt-2">
            Schedule master guild maintenance, review past inspection logs, track active repair tickets, file instant warranty claims, and order guaranteed genuine factory parts.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <!-- 1. Upcoming Maintenance & Scheduler -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <div class="flex justify-between items-center border-b border-white/10 pb-2">
              <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-1.5">
                <span>⏰</span> Upcoming Maintenance
              </h4>
              <button onclick="window.FurnitureTwinApp.openScheduleServiceModal('${twin.id}')" class="text-[10px] text-champagne font-cinzel hover:underline">
                + Schedule
              </button>
            </div>

            <div class="space-y-3">
              ${(twin.upcomingMaintenance && twin.upcomingMaintenance.length > 0)
                ? twin.upcomingMaintenance.map(m => `
                  <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5 text-xs">
                    <div class="flex justify-between">
                      <strong class="text-white">${m.title}</strong>
                      <span class="badge-gold text-[8px]">${m.status}</span>
                    </div>
                    <div class="flex justify-between text-[10px] text-stone-400">
                      <span>Due: <strong class="text-champagne font-mono">${m.dueDate}</strong></span>
                      <span>Cost: <strong class="text-white font-mono">₹${m.estimatedCost}</strong></span>
                    </div>
                    <p class="text-[10px] text-stone-300 leading-relaxed">${m.reason}</p>
                  </div>
                `).join('')
                : `<p class="text-xs text-stone-400 italic">No scheduled maintenance tasks pending.</p>`
              }
            </div>
          </div>

          <!-- 2. Previous Services & Repair Requests -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <div class="flex justify-between items-center border-b border-white/10 pb-2">
              <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-1.5">
                <span>🛠️</span> Service & Repair Log
              </h4>
              <span class="text-[10px] text-stone-400 font-mono">${(twin.serviceHistory || []).length} Recorded</span>
            </div>

            <div class="space-y-3 max-h-80 overflow-y-auto pr-1">
              ${(twin.serviceHistory || []).map(s => `
                <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-xs">
                  <div class="flex justify-between">
                    <strong class="text-white">${s.type}</strong>
                    <span class="text-champagne font-mono text-[10px]">${s.date}</span>
                  </div>
                  <div class="text-[10px] text-stone-400">Butler: <strong class="text-stone-200">${s.technician}</strong></div>
                  <p class="text-[10px] text-stone-300 italic">${s.notes}</p>
                  <span class="badge-gold text-[8px] bg-emerald-950 text-emerald-400">${s.status || 'Verified'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3. Warranty Status & Active Claims -->
          <div class="bg-black/75 p-5 rounded-2xl border border-antiqueGold/30 space-y-4">
            <div class="flex justify-between items-center border-b border-white/10 pb-2">
              <h4 class="font-cinzel font-bold text-sm text-champagne flex items-center gap-1.5">
                <span>📜</span> Warranty Claims Vault
              </h4>
              <span class="badge-gold text-[8px] bg-emerald-950 text-emerald-400">${twin.warranty.status}</span>
            </div>

            <div class="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5 text-xs">
              <div class="text-stone-300 font-bold">${twin.warranty.label}</div>
              <div class="text-[10px] text-stone-400 font-mono">Certificate: <strong class="text-champagne">${twin.warranty.certificateId}</strong></div>
              <p class="text-[10px] text-stone-300 leading-relaxed">${twin.warranty.coverage}</p>
            </div>

            <div class="space-y-2">
              <span class="text-[11px] font-cinzel font-bold text-stone-400 block">Active / Past Claims:</span>
              ${(twin.warranty.claims && twin.warranty.claims.length > 0)
                ? twin.warranty.claims.map(c => `
                  <div class="p-2.5 bg-antiqueGold/10 rounded-xl border border-antiqueGold/30 text-xs space-y-1">
                    <div class="flex justify-between">
                      <strong class="text-white">${c.claimId}</strong>
                      <span class="text-emerald-400 font-bold text-[10px]">${c.status}</span>
                    </div>
                    <p class="text-[10px] text-stone-300">${c.reason} - ${c.details}</p>
                  </div>
                `).join('')
                : `<p class="text-xs text-stone-400 italic">No warranty claims filed. Coverage is 100% active and unencumbered.</p>`
              }
            </div>
          </div>

        </div>

      </div>
    `;
  }

  // =========================================================================
  // TAB 7: FURNITURE EVENT TIMELINE (6-Stage Milestone Journey)
  // =========================================================================
  function renderTimelineTab(twin) {
    const events = twin.eventTimeline || [];

    return `
      <div class="space-y-6 font-sans">
        
        <div class="bg-gradient-to-r from-royalNavy/90 via-royalPurple/80 to-obsidian/95 p-5 rounded-2xl border border-antiqueGold/40 shadow-xl">
          <div class="flex flex-wrap items-center justify-between gap-3 border-b border-antiqueGold/20 pb-3">
            <div>
              <span class="badge-gold text-[9px] uppercase tracking-widest px-2 py-0.2 rounded">Lifecycle Milestone Journey</span>
              <h3 class="text-xl font-cinzelDecor font-bold text-white gold-gradient-text mt-0.5">
                FURNITURE EVENT TIMELINE
              </h3>
            </div>
            <button onclick="window.FurnitureTwinApp.openLogEventModal('${twin.id}')"
              class="btn-gold text-xs font-cinzel font-black px-3.5 py-1.5 rounded-xl shadow">
              + Log Custom Event 🌟
            </button>
          </div>
          
          <!-- 6-Stage Progress Indicator -->
          <div class="grid grid-cols-6 gap-2 pt-4 text-center">
            ${['Purchased', 'Customized', 'Delivered', 'Installed', 'Serviced', 'Upgraded'].map((stg, i) => `
              <div class="space-y-1">
                <div class="w-7 h-7 mx-auto rounded-full bg-antiqueGold text-black font-black text-xs flex items-center justify-center shadow-[0_0_10px_rgba(201,162,39,0.5)]">
                  ${i + 1}
                </div>
                <span class="text-[10px] font-cinzel font-bold text-champagne block">${stg}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Vertical Milestone Timeline -->
        <div class="bg-black/75 p-6 rounded-2xl border border-antiqueGold/30 space-y-6">
          <div class="relative border-l-2 border-antiqueGold/40 ml-4 pl-6 space-y-8">
            ${events.map((evt, idx) => `
              <div class="relative group">
                <!-- Node Icon -->
                <div class="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-black border-2 border-antiqueGold text-xs flex items-center justify-center shadow-[0_0_12px_rgba(201,162,39,0.5)] group-hover:scale-110 transition transform">
                  ${evt.icon || '📍'}
                </div>

                <div class="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-antiqueGold/50 transition space-y-1.5">
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <span class="badge-gold text-[8px] uppercase tracking-wider">${evt.stage}</span>
                    <span class="text-[10px] font-mono text-champagne font-bold">${evt.date}</span>
                  </div>
                  <h4 class="font-cinzel font-bold text-sm text-white">${evt.title}</h4>
                  <p class="text-xs text-stone-300 leading-relaxed">${evt.details}</p>
                  ${evt.badge ? `<span class="inline-block text-[9px] font-mono text-stone-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">${evt.badge}</span>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MODALS & ACTIONS
  // =========================================================================

  // Move Room Modal
  function openMoveRoomModal(twinId) {
    const twin = DB.getTwinById(twinId);
    if (!twin) return;

    const rooms = DB.getAvailableRooms();
    const modalHTML = `
      <div id="twinModalOverlay" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-royalNavy via-royalPurple to-obsidian border-2 border-antiqueGold rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
          
          <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
            <h3 class="font-cinzelDecor font-bold text-base text-white gold-gradient-text">REASSIGN ROOM PLACEMENT</h3>
            <button onclick="window.FurnitureTwinApp.closeModal()" class="text-stone-400 hover:text-white text-lg font-bold">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <p class="text-stone-300">
              Select the new chamber for <strong>${twin.name}</strong> (${twin.id}):
            </p>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Destination Room:</label>
              <select id="moveRoomSelect" class="w-full bg-black/80 border border-antiqueGold/40 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne">
                ${rooms.map(r => `<option value="${r}" ${twin.currentRoom === r ? 'selected' : ''}>${r}</option>`).join('')}
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Custom Chamber Label (Optional):</label>
              <input type="text" id="moveRoomTag" placeholder="e.g. Grand Salon, Penthouse Balcony, Study Alcove" value="${twin.customRoomTag || ''}" class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne" />
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Relocation Reason / Note:</label>
              <textarea id="moveRoomReason" rows="2" placeholder="e.g. Rearranged for seasonal entertaining in Grand Salon." class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button onclick="window.FurnitureTwinApp.closeModal()" class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300">
              Cancel
            </button>
            <button onclick="window.FurnitureTwinApp.confirmMoveRoom('${twin.id}')" class="btn-gold px-5 py-2 rounded-xl text-xs font-cinzel font-black shadow">
              Confirm Relocation ✓
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Add Custom Room Modal
  function openAddCustomRoomModal() {
    const modalHTML = `
      <div id="twinModalOverlay" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-royalNavy via-royalPurple to-obsidian border-2 border-antiqueGold rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
          
          <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
            <h3 class="font-cinzelDecor font-bold text-base text-white gold-gradient-text">CREATE CUSTOM ROOM</h3>
            <button onclick="window.FurnitureTwinApp.closeModal()" class="text-stone-400 hover:text-white text-lg font-bold">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <p class="text-stone-300">
              Add a new bespoke palace chamber to your furniture collection:
            </p>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Custom Room Name:</label>
              <input type="text" id="newCustomRoomName" placeholder="e.g. Royal Library, Wine Lounge, Penthouse Terrace" class="w-full bg-black/80 border border-antiqueGold/40 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button onclick="window.FurnitureTwinApp.closeModal()" class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300">
              Cancel
            </button>
            <button onclick="window.FurnitureTwinApp.confirmAddCustomRoom()" class="btn-gold px-5 py-2 rounded-xl text-xs font-cinzel font-black shadow">
              Create Room ✓
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Schedule Service Modal
  function openScheduleServiceModal(twinId) {
    const twin = DB.getTwinById(twinId);
    if (!twin) return;

    const modalHTML = `
      <div id="twinModalOverlay" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-royalNavy via-royalPurple to-obsidian border-2 border-antiqueGold rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
          
          <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
            <h3 class="font-cinzelDecor font-bold text-base text-white gold-gradient-text">BOOK PALACE BUTLER SERVICE</h3>
            <button onclick="window.FurnitureTwinApp.closeModal()" class="text-stone-400 hover:text-white text-lg font-bold">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <p class="text-stone-300">
              Schedule master artisan maintenance for <strong>${twin.name}</strong>:
            </p>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Maintenance Service Type:</label>
              <select id="serviceTypeSelect" class="w-full bg-black/80 border border-antiqueGold/40 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne">
                <option value="Organic Beeswax Grain Hydration & Velvet Nap Steam">Organic Beeswax Grain Hydration & Velvet Nap Steam (₹1,450)</option>
                <option value="Timber Deep Nourish & Joint Acoustic Calibration">Timber Deep Nourish & Joint Acoustic Calibration (₹1,800)</option>
                <option value="Italian Full-Grain Leather Cream & Conditioning">Italian Full-Grain Leather Cream & Conditioning (₹950)</option>
                <option value="Marble Nano-Ceramic Stain Barrier Re-Seal">Marble Nano-Ceramic Stain Barrier Re-Seal (₹1,600)</option>
                <option value="German Hydraulic Piston Lubrication & Joinery Check">German Hydraulic Piston Lubrication & Joinery Check (₹1,800)</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Preferred Service Date:</label>
              <input type="date" id="serviceDateInput" value="${new Date(Date.now() + 14*86400000).toISOString().split('T')[0]}" class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne" />
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Special Butler Instructions:</label>
              <textarea id="serviceNotesInput" rows="2" placeholder="e.g. Please bring extra natural beeswax balm and soft nap brushes." class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button onclick="window.FurnitureTwinApp.closeModal()" class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300">
              Cancel
            </button>
            <button onclick="window.FurnitureTwinApp.confirmScheduleService('${twin.id}')" class="btn-gold px-5 py-2 rounded-xl text-xs font-cinzel font-black shadow">
              Confirm Butler Booking ✓
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Submit Repair Modal
  function openSubmitRepairModal(twinId) {
    const twin = DB.getTwinById(twinId);
    if (!twin) return;

    const modalHTML = `
      <div id="twinModalOverlay" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-royalNavy via-royalPurple to-obsidian border-2 border-antiqueGold rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
          
          <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
            <h3 class="font-cinzelDecor font-bold text-base text-white gold-gradient-text">REQUEST REPAIR BUTLER</h3>
            <button onclick="window.FurnitureTwinApp.closeModal()" class="text-stone-400 hover:text-white text-lg font-bold">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <p class="text-stone-300">
              File a service repair ticket for <strong>${twin.name}</strong> (${twin.id}):
            </p>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Issue Category:</label>
              <select id="repairCategorySelect" class="w-full bg-black/80 border border-antiqueGold/40 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne">
                <option value="Surface Scuff / Timber Scratch Repair">Surface Scuff / Timber Scratch Repair</option>
                <option value="Fabric Velvet Mark / Spot Cleaning">Fabric Velvet Mark / Spot Cleaning</option>
                <option value="Joinery Micro-Tightening & Level Alignment">Joinery Micro-Tightening & Level Alignment</option>
                <option value="Swivel / Drawer Glide Mechanism Adjustment">Swivel / Drawer Glide Mechanism Adjustment</option>
                <option value="Hardware / 24K Leaf Touch-up">Hardware / 24K Leaf Touch-up</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Description of Concern:</label>
              <textarea id="repairDescInput" rows="3" placeholder="Provide details regarding the location and nature of the concern." class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne"></textarea>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Urgency Level:</label>
              <select id="repairPrioritySelect" class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne">
                <option value="Standard (Within 48h)">Standard (Within 48h)</option>
                <option value="Priority Royal Butler Visit (Next Day)">Priority Royal Butler Visit (Next Day)</option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button onclick="window.FurnitureTwinApp.closeModal()" class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300">
              Cancel
            </button>
            <button onclick="window.FurnitureTwinApp.confirmSubmitRepair('${twin.id}')" class="btn-gold px-5 py-2 rounded-xl text-xs font-cinzel font-black shadow">
              Dispatch Butler Request 🛠️
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Submit Warranty Claim Modal
  function openSubmitWarrantyClaimModal(twinId) {
    const twin = DB.getTwinById(twinId);
    if (!twin) return;

    const modalHTML = `
      <div id="twinModalOverlay" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-royalNavy via-royalPurple to-obsidian border-2 border-antiqueGold rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
          
          <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
            <h3 class="font-cinzelDecor font-bold text-base text-white gold-gradient-text">FILE 10-YEAR ROYAL WARRANTY CLAIM</h3>
            <button onclick="window.FurnitureTwinApp.closeModal()" class="text-stone-400 hover:text-white text-lg font-bold">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 bg-white/5 rounded-xl border border-white/10">
              <span class="text-stone-400 text-[10px] block">Certificate:</span>
              <strong class="text-champagne font-mono">${twin.warranty.certificateId} • ${twin.warranty.remainingYears} Remaining</strong>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Claim Reason:</label>
              <select id="claimReasonSelect" class="w-full bg-black/80 border border-antiqueGold/40 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne">
                <option value="Structural Timber Foundation Integrity Verification">Structural Timber Foundation Integrity Verification</option>
                <option value="Mortise & Tenon Joint Retention Inspection">Mortise & Tenon Joint Retention Inspection</option>
                <option value="Hydraulic Gas Piston Mechanism Coverage">Hydraulic Gas Piston Mechanism Coverage</option>
                <option value="High-Resilience Multi-Density Foam Core Assessment">High-Resilience Multi-Density Foam Core Assessment</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Claim Notes:</label>
              <textarea id="claimNotesInput" rows="3" placeholder="Describe the structural check requested under full warranty coverage." class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans focus:outline-none focus:border-champagne"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button onclick="window.FurnitureTwinApp.closeModal()" class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300">
              Cancel
            </button>
            <button onclick="window.FurnitureTwinApp.confirmSubmitWarrantyClaim('${twin.id}')" class="btn-gold px-5 py-2 rounded-xl text-xs font-cinzel font-black shadow">
              Submit Warranty Claim 📜
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  // Log Custom Event Modal
  function openLogEventModal(twinId) {
    const twin = DB.getTwinById(twinId);
    if (!twin) return;

    const modalHTML = `
      <div id="twinModalOverlay" class="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div class="bg-gradient-to-br from-royalNavy via-royalPurple to-obsidian border-2 border-antiqueGold rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-fade-in font-sans">
          
          <div class="flex items-center justify-between border-b border-antiqueGold/30 pb-3">
            <h3 class="font-cinzelDecor font-bold text-base text-white gold-gradient-text">LOG OWNERSHIP MILESTONE</h3>
            <button onclick="window.FurnitureTwinApp.closeModal()" class="text-stone-400 hover:text-white text-lg font-bold">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Milestone Stage:</label>
              <select id="eventStageSelect" class="w-full bg-black/80 border border-antiqueGold/40 rounded-xl px-3 py-2 text-white font-sans">
                <option value="Serviced">Serviced (Routine Care / Polish)</option>
                <option value="Upgraded">Upgraded (Accessories / Modification)</option>
                <option value="Celebrated">Celebrated (Family Event / Gala Gathering)</option>
                <option value="Relocated">Relocated (Room Move)</option>
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Milestone Title:</label>
              <input type="text" id="eventTitleInput" placeholder="e.g. Diwali Royal Banquet Preparation" class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans" />
            </div>

            <div class="space-y-1.5">
              <label class="font-cinzel font-bold text-champagne block">Details & Memories:</label>
              <textarea id="eventDetailsInput" rows="2" placeholder="e.g. Cleaned with organic beeswax balm before festival gala." class="w-full bg-black/80 border border-white/20 rounded-xl px-3 py-2 text-white font-sans"></textarea>
            </div>
          </div>

          <div class="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
            <button onclick="window.FurnitureTwinApp.closeModal()" class="px-4 py-2 rounded-xl text-xs font-cinzel font-bold bg-white/10 hover:bg-white/20 text-stone-300">
              Cancel
            </button>
            <button onclick="window.FurnitureTwinApp.confirmLogEvent('${twin.id}')" class="btn-gold px-5 py-2 rounded-xl text-xs font-cinzel font-black shadow">
              Record Milestone 🌟
            </button>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }

  function closeModal() {
    const overlay = document.getElementById("twinModalOverlay");
    if (overlay) overlay.remove();
  }

  // Toast Notification Helper
  function showToast(msg) {
    const toast = document.createElement("div");
    toast.className = "fixed bottom-6 right-6 bg-gradient-to-r from-antiqueGold to-champagne text-black font-cinzel font-bold text-xs px-5 py-3 rounded-2xl shadow-2xl z-50 border-2 border-white/40 flex items-center gap-2 animate-bounce";
    toast.innerHTML = `<span>👑</span> <span>${msg}</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = "opacity 0.5s ease";
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 500);
    }, 3500);
  }

  function setupEventListeners() {
    // Esc key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // =========================================================================
  // PUBLIC CONTROLLER API (Attached to window.FurnitureTwinApp)
  // =========================================================================
  window.FurnitureTwinApp = {
    init: init,
    
    selectTwin: function(id) {
      state.selectedTwinId = id;
      resetSimulationDraft();
      renderAll();
      showToast(`Selected Digital Twin: ${id}`);
    },

    switchTab: function(tabId) {
      state.activeTab = tabId;
      renderAll();
    },

    filterByRoom: function(roomName) {
      state.activeRoomFilter = roomName;
      renderAll();
    },

    // Simulation Handlers
    setSimulationColor: function(name, hex) {
      state.simulationDraft.color = name;
      state.simulationDraft.colorHex = hex;
      renderActiveTabContent(getSelectedTwin());
    },

    setSimulationFabric: function(fabricName) {
      state.simulationDraft.fabric = fabricName;
      renderActiveTabContent(getSelectedTwin());
    },

    setSimulationFinish: function(finishName, hex) {
      state.simulationDraft.woodFinish = finishName;
      state.simulationDraft.woodHex = hex;
      renderActiveTabContent(getSelectedTwin());
    },

    setSimulationSeater: function(seaterName) {
      state.simulationDraft.seater = seaterName;
      renderActiveTabContent(getSelectedTwin());
    },

    resetSimulation: function() {
      resetSimulationDraft();
      renderActiveTabContent(getSelectedTwin());
      showToast("Simulation draft reset to active twin state.");
    },

    applySimulationToTwin: function(twinId) {
      const draft = state.simulationDraft;
      DB.saveCustomConfiguration(twinId, {
        color: draft.color,
        colorHex: draft.colorHex,
        fabric: draft.fabric,
        woodFinish: draft.woodFinish,
        woodHex: draft.woodHex,
        seater: draft.seater
      });
      renderAll();
      showToast("Simulation applied! Configuration saved permanently in Furniture Twin Memory.");
    },

    revertFactoryConfig: function(twinId) {
      if (confirm("Revert this Digital Twin to its factory original configuration?")) {
        DB.revertToOriginalConfiguration(twinId);
        resetSimulationDraft();
        renderAll();
        showToast("Reverted to factory original configuration.");
      }
    },

    // Modal Triggers
    openMoveRoomModal: openMoveRoomModal,
    openAddCustomRoomModal: openAddCustomRoomModal,
    openScheduleServiceModal: openScheduleServiceModal,
    openSubmitRepairModal: openSubmitRepairModal,
    openSubmitWarrantyClaimModal: openSubmitWarrantyClaimModal,
    openLogEventModal: openLogEventModal,
    closeModal: closeModal,

    // Confirmations
    confirmMoveRoom: function(twinId) {
      const room = document.getElementById("moveRoomSelect").value;
      const tag = document.getElementById("moveRoomTag").value;
      const reason = document.getElementById("moveRoomReason").value;

      DB.reassignTwinRoom(twinId, room, tag, reason);
      closeModal();
      renderAll();
      showToast(`Furniture Twin relocated to ${room} (${tag || room})!`);
    },

    confirmAddCustomRoom: function() {
      const roomName = document.getElementById("newCustomRoomName").value;
      if (roomName && roomName.trim().length > 1) {
        DB.addCustomRoom(roomName.trim());
        state.activeRoomFilter = roomName.trim();
        closeModal();
        renderAll();
        showToast(`Created Custom Room: "${roomName.trim()}"`);
      }
    },

    confirmScheduleService: function(twinId) {
      const task = document.getElementById("serviceTypeSelect").value;
      const date = document.getElementById("serviceDateInput").value;
      const notes = document.getElementById("serviceNotesInput").value;

      DB.scheduleMaintenance(twinId, task, date, notes, 1450);
      closeModal();
      renderAll();
      showToast("Palace Butler service booked successfully!");
    },

    confirmSubmitRepair: function(twinId) {
      const cat = document.getElementById("repairCategorySelect").value;
      const desc = document.getElementById("repairDescInput").value;
      const priority = document.getElementById("repairPrioritySelect").value;

      DB.submitRepairRequest(twinId, cat, desc, priority);
      closeModal();
      renderAll();
      showToast("Repair Butler request logged. Ticket active!");
    },

    confirmSubmitWarrantyClaim: function(twinId) {
      const reason = document.getElementById("claimReasonSelect").value;
      const notes = document.getElementById("claimNotesInput").value;

      DB.submitWarrantyClaim(twinId, reason, notes);
      closeModal();
      renderAll();
      showToast("10-Year Royal Warranty claim filed & approved!");
    },

    confirmLogEvent: function(twinId) {
      const stage = document.getElementById("eventStageSelect").value;
      const title = document.getElementById("eventTitleInput").value;
      const desc = document.getElementById("eventDetailsInput").value;

      if (title && title.trim()) {
        DB.logCustomEvent(twinId, stage, title.trim(), desc);
        closeModal();
        renderAll();
        showToast("Milestone recorded in Furniture Twin timeline!");
      }
    },

    pairAccessory: function(twinId, name, price) {
      DB.purchaseAccessory(twinId, name, price);
      renderAll();
      showToast(`Paired ${name} with Digital Twin!`);
    },

    orderPart: function(twinId, name, price) {
      DB.orderReplacementPart(twinId, name, price);
      renderAll();
      showToast(`Ordered genuine replacement part: ${name}`);
    }
  };

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : {});

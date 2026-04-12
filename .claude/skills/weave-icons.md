# Weave Brand Extended - Icon Usage Rules

This skill provides rules and guidelines for using icons with Weave Brand Extended.

## Core Rules

**Do not use icons from `@mui/icons-material`.**

**Always use icons from `@weave-brand/icon`.**

**Always wrap icons with MUI's `SvgIcon` component.**

## Icon Sizing

Icon color is controlled with `sx` `color` prop and size with `sx` `fontSize` prop on the `SvgIcon` component.

**fontSize values:** `"small"`, `"medium"`, `"large"`, `"extra-large"`.

## Basic Usage Pattern

```tsx
import { SvgIcon } from "@mui/material";
import { CtaArrowRight } from "@weave-brand/icon";

<SvgIcon fontSize="medium">
  <CtaArrowRight />
</SvgIcon>
```

## Icon Color

Control icon color using the `color` prop or `sx`:

```tsx
<SvgIcon sx={{ color: "text-color.heavy" }}>
  <IconName />
</SvgIcon>
```

## Available Icons

The ONLY available icons from `@weave-brand/icon` are:

**UI Controls & Actions:**
AccountNotFound, Add, AddFolder, AddMember, AddPage, Archive, Attach, Attachment, Back, Bookmark, BookmarkFilled, Cancel, Checkmark, Clock, Cross, CtaArrowRight, CtaArrowRightSolid, Down, Download, Edit, EditMarkerLeft, EditMarkerRight, EditProfile, Exit, ExportMove, External, ExternalLink, Filter, FilterTokens, Flag, Flip, Forward, Fullscreen, Grid, HamburgerMenu, Hidden, Import, Key, Link, List, Lock, LockFilled, Maximize, Minimize, More, MoreVertical, NotEditable, Paste, Pin, Print, Resize, Restart, Save, Search, SelectAll, SelectNone, Send, Settings, Share, Sort, Tag, TagSolid, Trash, Undo, Redo, Unlink, Unlock, Unpin, Up, Upload, Visible, ZoomIn, ZoomOut

**Navigation & Carets:**
CaretDown, CaretLeft, CaretRight, CaretUp, CaretDoubleLeft, CaretDoubleRight

**Numbers (for steppers):**
One, Two, Three, Four, Five, Six, Seven, Eight, Nine, Ten

**Media & Playback:**
ClosedCaptioning, MicOff, MicOn, Mute, PlayOutline, PlaySolid, PlaybackFastForward, PlaybackGoToEnd, PlaybackGoToStart, PlaybackLoop, PlaybackNext, PlaybackPause, PlaybackPauseFilled, PlaybackPlay, PlaybackPlayFilled, PlaybackPrevious, PlaybackRecord, PlaybackRewind, PlaybackShuffle, PlaybackStop, VideoOff, VideoOn, Volume

**Status & Notifications:**
AlertOutline, AlertSolid, Complete, CompleteSolid, CompleteOutline, ErrorOutline, ErrorSolid, InfoOutline, InfoSolid, HelpOutline, HelpSolid, NotifcationOff, Notification, UnavailableSolid

**Files & Documents:**
FileAssembly, FileAudio, FileDocument, FileGeneric, FileImage, FilePart, FilePdf, FilePresentation, FileSpreadsheet, FileVideo, FileZip, Folder, FolderOpen

**Communication:**
Chat, ChatOffline, ChatOnline, Comment, Mail, Callback, CreateCase, Feedback

**Charts & Data:**
BarChart, Graph, PieChartOutline, PieChartSolid

**Devices:**
Android, DeviceDesktop, DeviceMobile, DeviceMobileFilled, DeviceTablet, Devices, Linux, Mac, Windows

**Industry & Business:**
Architecture, Benefits, Billing, BillStack, Building, Business, CardPayment, Collaboration, Dashboard, Data, DesignEngineering, DocumentManagement, Education, GameDevelopment, GeneralContractor, GenerativeAi, Infrastructure, Manufacturing, MepContractor, MepEngineering, ProductsAndServices, ProductsAndServicesExtension, ProductsAndServicesSimulation, ProjectManagement, Service, SiteDesign, SoftwareEngineering, StructuralEngineering, StructuralFabricator, Transportation, WaterInfrastructure, Workflow

**Social Media:**
Bilibili, BilibiliCircle, Blog, BlogCircle, Discord, DiscordCircle, Facebook, FacebookCircle, Github, GithubCircle, Imdb, ImdbCircle, Instagram, InstagramCircle, LinkedIn, LinkedinCircle, NaverBlog, NaverBlogCircle, Pinterest, PinterestCircle, Reddit, RedditCircle, Redshift, RedshiftCircle, Threads, ThreadsCircle, Tiktok, TiktokCircle, Twitch, TwitchCircle, Twitter, TwitterCircle, Wechat, WechatCircle, Weibo, WeiboCircle, X, XCircle, Xing, XingCircle, Youku, YoukuCircle, Youtube, YoutubeCircle, Zhihu, ZhihuCircle

**Other:**
AutodeskAssistant, Calendar, CalendarDay, CartFull, Checklist, Circle, CircleFull, CircleHalf, Cloud, Compare, Copy, Day15, Day30, Equation, Favorite, FavoriteFull, FavoriteHalf, Featured, Field, Forums, Globe, GooglePlay, Hierarchy, Home, Hub, Inbox, Item, Language, Layers, Location, ManageAccess, OnlineViewers, PermissionGroup, PermissionIndividual, Personal, PersonalData, Photos, Profile, Properties, Publish, Quantities, Report, Security, Signal, Ssl, Stage, Subscriptions, Support, SupportCall, Sync, ThumbsDown, ThumbsDownFilled, ThumbsUp, ThumbsUpFilled, UserInactive, ViewColumn, ViewFile, VisualEffects, Waffle

**Special icon subpackages:**

- **Display Icons** (from `@weave-brand/icon/display-icons`): `Alert`, `Cancel`, `Complete`, `Error`, `Info`, `Profile`
- **UI Controls** (from `@weave-brand/icon/ui-controls`): `CaretDoubleLeftSmall`, `CaretDoubleRightSmall`, `CaretDownSmall`, `CaretDown`, `CaretLeftSmall`, `CaretLeft`, `CaretRightSmall`, `CaretRight`, `CaretUpSmall`, `CaretUp`, `Checkmark`, `Error`, `External`, `Indeterminate`, `Success`

## Pictograms (100x100)

Pictograms are larger illustrations (100x100 viewBox) for use in marketing, hero sections, and feature highlights. Import from `@weave-brand/icon/pictograms`:

**Available Pictograms:**

Svg15Day, Svg30Day, Svg3DSettings, Svg404Error, AccessError, ActionableInsights, ActionableInsightsTeam, ActiveTrials, Animation, Audit, AutoRenew, AutodeskCollections, AutodeskEmployeeImpactAtWork, AutodeskLaptop, Balances, BalancesTime, BimDesignAutomation, BimDesignCollaboration, BimDesignManagement, BimDigitalTwin, BimImmersiveVisualization, BimMepSystemsAnalysis, BimPredictiveAnalytics, BoostProductivity, Centralize, Certification, CheckDay, ChecklistSettings, Connect, ConstructionDesign, ConstructionSafety, Contract, ContractSubscription, ContractSubscriptionCross, CreditMemo, CreditMemoCross, DataDriven, Deforestation, Design, DesignCollaboration, DesignSettings, DesignWorkflow, DigitalExperience, Document, DocumentManagement, Download, ExpandOpportunities, Faqs, FedRamp, FindContent, FullContextImage, Gear, GenerativeAi, GenerativeDesign, Hubs, Individual, InstallLibrary, InstallTeamLibrary, Invoice, InvoiceCreditMemoCash, InvoiceCross, LinkError, MachiningAutomation, MonitorCadGeneric, NetworkLicense, NoCustomerDetails, NoMatchingResultsDate, NoMatchingResultsFilter, OpenCollaboration, OperationServices, OptimizeDesignReviews, OrderHistory, OrgDesign, PageLoadError, Partners, PaymentMethod, PaymentMethodCross, PerformanceInsights, PersonalDevelopment, ProBono, ProductUpdates, ProductUpdatesExtensions, ProductUpdatesLanguages, ProductsServices, ProductsUpdates, ProjectControls, ProjectCost, ProjectTransparency, Quote, QuoteAdd, QuoteCross, QuoteForward, RenewInCart, ScaleCloudConnectedWorkflows, Search, SeatUsage, Simplicity, SmartSustainableCities, SsoLogin, StrengthenRelationships, SubscriptionEducators, Summary, SupplyChainLogistics, Support, SupportSettings, TeamInsights, TokenUsage, Tools, Trial, TrialCross, UnlockData, UpcomingPayments, UsageDetails, UserInsights, UserManagementGroup, UserManagementProduct, ValuableTime, ValueInclusive, VirtualAssistant, VisualEffects, WatchVideo, WaysWeWorkIntegrity

## Pictograms3D (100x100)

Pictograms3D are 3D-styled illustrations (100x100 viewBox) for use in product features and technical content. Import from `@weave-brand/icon/pictograms3d`:

**Available Pictograms3D:**

Svg3DModeling, Svg3DPrinting, ActivityInsights, AiOptimizedEnvironmentalDesign, AiPoweredRiggingAnimationTools, AiTools, Animation, AnimateMultipleCharacters, AnimationRendering, Architecture, ArchitectureDrawing, ArchitectureElement, AutodeskAssistant, Autolisp, AutomatedClashDetection, Automation, BimApplicationsWorkflowsApi, Bridge, BuildEfficientPipeline, BuildingDesign, CentralizedIssueManagement, ChangeAnalytics, CharacterModeling3D, Clock, CloudAutomationApi, CloudDataManagementApi, CloudDrawings, CloudReview, CommonDataEnvironment, ComponentLibrary, ComputerAidedDesign, ConcreteDesign, Configurator, ConnectedIssues, ConnectDesignToFabrication, Construction, Count, CreateEditDrawingsOnline, Dashboards, DeliverBiggerEffects, DesignCoordinationAndReview, DesignPackageExchange, DetailComponentManager, DigitalTwins, DistributionRoutingAndSizing, DiversifyGameEnvironments, DocumentManagement, DownloadInstallAccount, DrawingLayers, EducationAccess, Electrical, ElectricalAndMechanicalEquipmentLayout, EffectsFire, EnhancedDesign, EnterpriseIntegrations, EnvironmentalAnalysis, EquipmentSelectionAndSizing, FbxSdk, FeedbackBoards, FlowGraphEngineApi, FluidCollaboration, Forums, Gallery, GameDesign, GenerativeAi, GenerateProductionReadyDataAutomatically, Generic001, Generic002, Generic003, Generic004, Generic005, Generic006, Generic007, Generic008, Generic009, IntegratedStructuralAnalysis, Interoperability, LearnAccount, LightRail, LinearFeatureExtraction, LinkCloudModels, LookDevelopment, LookDevelopmentPhotorealistic, Manage, Manufacturing, Map3D, Markup2D3DCad, MarkupImportAssist, MaterialCosts, MechanicalDesign, Mep, ModelDerivativeApi, ModelDerivativeServices, MoveEasilyBetweenSoftware, MyInsights, News, OnSetProduction, OpenAndExtendable, OpenGraphicsStandards, PipelineEfficiency, Plant3D, PlantAndEquipmentRoomLayouts, PluginArchitectureVisualEffects, PopulateWorldsWithEase, PreBuiltEffects, ProduceAnimatedProjectsWithSpeed, ProductApi, ProductDesign, ProjectConnections, ProjectStandards, QualityEffects, RasterDesign, RealityCaptureApi, RiggingAndAnimation, ScaleRendering, SignIn, SiteContext, SiteDesign, SpaceZoneAndLoadRequirements, SpaceZoneObjectReports, SpecializedToolsets, SteelDesign, StreamlineVfxWorkflows, StructuralDesignOptimization, SynchronizeTeam, SystemAndEnergyAnalysis, Trace, Transfer, TransportationDesign, Truck, Tunnel, Tutorials, VehicleTracking, ViewerSdk, VisualEffects, WaterInfrastructureDesign, Water, WebhooksApi, WorkOffline

## Pictogram Usage

### Basic Pictogram Usage

```tsx
import { SvgIcon, Box } from "@mui/material";
import { Animation } from "@weave-brand/icon/pictograms";

<Box sx={{ width: 100, height: 100 }}>
  <SvgIcon sx={{ width: "100%", height: "100%" }}>
    <Animation />
  </SvgIcon>
</Box>
```

### Pictogram3D Usage

```tsx
import { SvgIcon, Box } from "@mui/material";
import { Architecture } from "@weave-brand/icon/pictograms3d";

<Box sx={{ width: 200, height: 200 }}>
  <SvgIcon sx={{ width: "100%", height: "100%" }}>
    <Architecture />
  </SvgIcon>
</Box>
```

### Pictograms in Hero Sections

```tsx
import { Grid, Typography, SvgIcon } from "@mui/material";
import { GenerativeAi } from "@weave-brand/icon/pictograms3d";

<Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    <Typography variant="display-large">Feature Title</Typography>
    <Typography variant="body-copy">Feature description...</Typography>
  </Grid>
  <Grid item xs={12} md={6}>
    <Box sx={{ width: 300, height: 300, mx: "auto" }}>
      <SvgIcon sx={{ width: "100%", height: "100%" }}>
        <GenerativeAi />
      </SvgIcon>
    </Box>
  </Grid>
</Grid>
```

## Do NOT:

- Do NOT use icons from `@mui/icons-material`
- Do NOT invent icon names that are not in the list above
- Do NOT use other icon libraries

## Icon Usage Examples

### In Buttons

```tsx
<Button
  variant="link-button"
  startIcon={<SvgIcon><CtaArrowRight /></SvgIcon>}
>
  Learn more
</Button>
```

### In IconButtons

```tsx
<IconButton aria-label="Close" variant="outlined">
  <SvgIcon><Cross /></SvgIcon>
</IconButton>
```

### In Alerts (using display-icons subpackage)

```tsx
import { Info } from "@weave-brand/icon/display-icons";

<Alert
  severity="info"
  icon={<SvgIcon><Info /></SvgIcon>}
>
  Alert message
</Alert>
```

### In Input Adornments

```tsx
<InputAdornment position="start">
  <SvgIcon><Search /></SvgIcon>
</InputAdornment>
```

### Accordion Stepper Icons

```tsx
import { One, Two, Three, Complete } from "@weave-brand/icon";

<AccordionSummary>
  <SvgIcon><One /></SvgIcon>
  <Typography variant="headline-smaller">Step 1</Typography>
</AccordionSummary>

// For completed steps:
<AccordionSummary>
  <SvgIcon><Complete /></SvgIcon>
  <Typography variant="headline-smaller">Completed</Typography>
</AccordionSummary>
```

## Post-Development Check

**When you're done writing code, always check for any icons using `@mui/icons-material`. Remove those and replace them with icons from `@weave-brand/icon` instead.**
